import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/login"       element={<Login />} />
      <Route path="/signup"      element={<Signup />} />
      <Route path="/onboarding"  element={<Onboarding />} />
      <Route path="/dashboard"   element={<Dashboard />} />
      <Route path="*"            element={<Navigate to="/" replace />} />
    </Routes>
  )
}
