import { app, BrowserWindow, shell, ipcMain, safeStorage } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'
import fs from 'fs/promises';
import { update } from './update'

const STORAGE_FILE = path.join(app.getPath('userData'), 'secure-tokens.enc');

// Load encrypted data from file
async function loadStorage(): Promise<Record<string, string>> {
  try {
    const data = await fs.readFile(STORAGE_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

// Save encrypted data to file
async function saveStorage(data: Record<string, string>) {
  await fs.writeFile(STORAGE_FILE, JSON.stringify(data), 'utf8');
}

ipcMain.handle('store-token', async (_, { key, value }: { key: string; value: string }) => {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error('Secure storage unavailable');
  }
  try {
    const encrypted = safeStorage.encryptString(value);
    const storage = await loadStorage();
    // Store as base64 string for JSON serialization
    storage[key] = encrypted.toString('base64');
    await saveStorage(storage);
    console.log(`[Token Store] Stored token: ${key}`);
  } catch (error) {
    console.error(`[Token Store Error] Failed to store token ${key}:`, error);
    throw error;
  }
});

ipcMain.handle('get-token', async (_, key: string) => {
  try {
    const storage = await loadStorage();
    const encryptedBase64 = storage[key];
    if (!encryptedBase64 || !safeStorage.isEncryptionAvailable()) {
      console.log(`[Token Get] Token not found or encryption unavailable: ${key}`);
      return null;
    }
    // Convert base64 back to Buffer for decryption
    const encrypted = Buffer.from(encryptedBase64, 'base64');
    const decrypted = safeStorage.decryptString(encrypted);
    console.log(`[Token Get] Retrieved token: ${key}`);
    return decrypted;
  } catch (error) {
    console.error(`[Token Get Error] Failed to get token ${key}:`, error);
    return null;
  }
});

ipcMain.handle('delete-token', async (_, key: string) => {
  try {
    const storage = await loadStorage();
    delete storage[key];
    await saveStorage(storage);
    console.log(`[Token Delete] Deleted token: ${key}`);
  } catch (error) {
    console.error(`[Token Delete Error] Failed to delete token ${key}:`, error);
    throw error;
  }
});







// default code

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) { // #298
    win.loadURL(VITE_DEV_SERVER_URL)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // Auto update
  update(win)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})
