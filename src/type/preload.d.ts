export {};

declare global {
  interface Window {
    electronAPI: {
      checkUpdate: () => Promise<any>;
      startDownload: () => Promise<any>;
      quitAndInstall: () => Promise<any>;

      onUpdateAvailable: (
        callback: (info: {
          update: boolean;
          version: string;
          newVersion: string;
        }) => void
      ) => void;

      onDownloadProgress: (
        callback: (info: { percent: number }) => void
      ) => void;

      onDownloaded: (callback: () => void) => void;

      onError: (callback: (err: any) => void) => void;
    };
  }
}
