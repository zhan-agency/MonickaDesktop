import { ReactNode } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { UserType } from '@/type/monicka'

export default function MainLayout({user}: {user: UserType}) {

  const footerLinks = [
    { to: "/support", title: "پشتیبانی" },
    { to: "/terms", title: "شرایط استفاده" },
    { to: "/about", title: "درباره ما" },
  ]

  return (
    <>
      <Header user={user} />
      <Outlet />
      <span id="mainBottom"></span>
      <Footer links={footerLinks} />
    </>
  )
}
