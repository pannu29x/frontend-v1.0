import React, { useState } from 'react'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const nav = useNavigate()
  const [form, setForm] = useState({usernameOrEmail:'', password:''})
  async function onSubmit(e){
    e.preventDefault()
    const { data } = await api.post('/auth/login', form)
    localStorage.setItem('token', data.token)
    nav('/')
  }
  return (
    <form onSubmit={onSubmit} className="card" style={{display:'grid', gap:12, maxWidth:400}}>
      <h2>Login</h2>
      <input placeholder="Username or Email" value={form.usernameOrEmail} onChange={e=>setForm({...form, usernameOrEmail:e.target.value})}/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
      <button>Login</button>
    </form>
  )
}
