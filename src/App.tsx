import './assets/App.css'
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import './assets/App.css'
import MainLayout from './layouts/base'
import { ClinicType, UserType } from './type/monicka'
import Calendar from './pages/Calendar'
import Booking from './pages/Booking'
import { useEffect, useState } from 'react'
import { getClinics } from './utils'

function App() {
  const [clinics, setClinics] = useState<ClinicType[]>([])
  useEffect(()=>{
    getClinics()
    .then(setClinics)
    .catch((err)=>console.log('Could not catch clinics: ',err))
  },[])
  
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