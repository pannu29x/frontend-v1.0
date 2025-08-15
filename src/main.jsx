import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Wallet from './pages/Wallet.jsx'
import Profile from './pages/Profile.jsx'
import CreateChallenge from './pages/CreateChallenge.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import { SpeedInsights } from "@vercel/speed-insights/react"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />} path="/">
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="profile/:username" element={<Profile />} />
        <Route path="create" element={<CreateChallenge />} />
        <Route path="admin" element={<AdminPanel />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
