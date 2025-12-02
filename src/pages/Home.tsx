import LargeTile from "@/components/Tiles/LargeTile"
import MediumTile from "@/components/Tiles/MediumTile"
import ProfileTile from "@/components/Tiles/ProfileTile"
import { UserType } from "@/type/monicka"
import { useEffect, useState } from "react"

declare global {
  interface Window {
    electron?: {
      ipcRenderer: {
        on: (channel: string, listener: (event: any, data: any) => void) => void
        removeListener: (channel: string, listener: (event: any, data: any) => void) => void
        invoke: (channel: string) => Promise<any>
      }
    }
  }
}

export default function Home({ user }: { user: UserType }) {
  const [status, setStatus] = useState<string>('Waiting...')
  useEffect(() => {
    console.log(status)
    const handler = (_e: any, data: any) => {
      if (data.status === 'available') setStatus(`New version ${data.version} found – downloading...`)
      else if (data.status === 'downloading') setStatus(`Downloading... ${data.percent}%`)
      else if (data.status === 'downloaded') setStatus('Update ready – close app to install')
      else if (data.status === 'latest') setStatus('You are up to date')
      else if (data.status === 'error') setStatus(`Error: ${data.message}`)
      else setStatus(data.status || 'checking')
    }

    window.electron?.ipcRenderer.on('updater', handler)
    return () => window.electron?.ipcRenderer.removeListener('updater', handler)
  }, [])

  const checkNow = () => {
    setStatus('Checking manually...')
    window.electron?.ipcRenderer.invoke('manual-check-update')
  }

  const menuTileProps = {
    titleBar: {
      to: "",
      button_to: "",
      title: "نوبت‌ها و پرداخت‌ها",
      icon: "/user.svg",
      button_icon: "/arrow-up-right-from-square.svg",
      iconBackgroundClassName: "bg-green-500",
    },
    type: "choices",
    items: [
      {
        to: "/calendar",
        title: "نوبت جدید",
      },
      {
        to: "/booking",
        title: "نمایش نوبت‌ها",
      },
      {
        to: "/schedule/dashboard",
        title: "نمایش نوبت‌ها",
      },
      {
        to: "/schedule/dashboard",
        title: "نمایش نوبت‌ها",
      },
      {
        to: "/schedule/dashboard",
        title: "نمایش نوبت‌ها",
      },
      {
        to: "/schedule/dashboard",
        title: "نمایش نوبت‌ها",
      },
    ]
  }
  const testsTileProps = {
    items: [
      {
        title: "سارا برهانی - MBTI",
        to: "/test/1",
        date: "۱۴۰۴/۰۲/۱۲",
      },
      {
        title: "شهرزاد مهریز - GOL",
        to: "/test/1",
        date: "۱۴۰۴/۰۲/۱۲",
      },
      {
        title: "حسین محمودی - CATTEL",
        to: "/test/1",
        date: "۱۴۰۴/۰۲/۱۲",
      },
    ],
    titleBar: {
      to: "/test",
      button_to: "/test/new",
      title: "آزمون‌های من",
      icon: "/folder-open.svg",
      button_icon: "/plus.svg",
      iconBackgroundClassName: "bg-blue-400",
    },
    type: "list",
  }

  return (
    <main id="main" className="w3-main-padding">
      <div className="tile-grid">
        <ProfileTile user={user} />
        <MediumTile {...testsTileProps} user={user} />
        <LargeTile {...menuTileProps} />
        <button onClick={checkNow} style={{ padding: '10px 20px', fontSize: 16 }}>
        Manual Check for Updates
      </button>
      </div>
    </main>
  )
}