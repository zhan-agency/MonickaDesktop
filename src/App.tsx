import './assets/App.css'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import MainLayout from './layouts/base'
import { ClinicType, UserType } from './type/monicka'
import Calendar from './pages/Calendar'
import Booking from './pages/Booking'
import { getClinics } from './utils'

function App() {
  const { isAuthenticated, isLoading } = useContext(AuthContext)
  const [clinics, setClinics] = useState<ClinicType[]>([])

  useEffect(() => {
    // Only fetch clinics if authenticated
    if (isAuthenticated) {
      getClinics()
        .then(setClinics)
        .catch((err) => console.log('Could not catch clinics: ', err))
    }
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    )
  }
  
  const user: UserType = {
    is_authenticated: true,
    email: "myemail@domain.com",
    get_full_name: "حسین پشتیبان",
    profile: {
      type: "3",
      get_type_display: "منشی",
      get_level_display: "طلایی",
      phone: '09124572171',
    },
    is_superuser: false,
    clinics: clinics[0]?.id ? clinics : [
      {
        id: 1,
        name: 'کلینیک زیبا',
        owner_id: 1,
        rooms: 5,
        phone: 9124572171,
      }
    ]
  }
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout user={user} />}>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/calendar" element={<Calendar user={user} />} />
          <Route path="/booking" element={<Booking user={user} />} />
        </Route>
      </Routes>
    </Router>
  )
}


export default App