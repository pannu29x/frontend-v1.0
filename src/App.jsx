import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import BackendStatus from "./components/BackendStatus";

function App() {
  return (
    <>
      <BackendStatus />
      {/* Rest of your app */}
    </>
  );
}

export default App;


const API = import.meta.env.VITE_API_BASE || 'https://challengegram-v1-0.onrender.com/api'
export default function App() {
  const nav = useNavigate()
  const token = localStorage.getItem('token')
  const me = token ? JSON.parse(atob(token.split('.')[1])) : null
  function logout(){ localStorage.removeItem('token'); nav('/login')}
  return (
    <div style={{fontFamily:'system-ui, sans-serif'}}>
      <nav className="nav">
        <Link to="/" className="brand">
          <img src="/src/assets/logo.svg" alt="logo"/><span>ChallengeGram</span>
        </Link>
        <input placeholder="Search username or challenge id" onKeyDown={e=>{
          if(e.key==='Enter'){ window.location.href = '/?q='+encodeURIComponent(e.target.value) }
        }} style={{flex:1}}/>
        <Link className="pill" to="/create">Create</Link>
        <Link className="pill" to="/wallet">Wallet</Link>
        {me ? <>
            <Link className="pill" to={`/profile/${me.username}`}>Profile</Link>
            <button className="pill" onClick={logout}>Logout</button>
          </>
          : <>
            <Link className="pill" to="/login">Login</Link>
            <Link className="pill" to="/signup">Sign Up</Link>
          </>}
      </nav>
      <div className="container">
        <Outlet context={{ API }} />
      </div>
    </div>
  )
}
