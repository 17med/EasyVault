import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/login'
import useStore from './Services/storage'
import { useEffect, useState } from 'react'
import Home from './Pages/home/Home'
export default function App() {
  const [islogin, setlogin] = useState('')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={islogin ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setlogin={setlogin} />} />
        <Route path="/home/*" element={<Home setlogin={setlogin} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
