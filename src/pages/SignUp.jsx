import React, { useState } from 'react'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'

export default function SignUp(){
  const nav = useNavigate()
  const [form, setForm] = useState({username:'', email:'', password:''})
  async function onSubmit(e){
    e.preventDefault()
    const { data } = await api.post('/auth/signup', form)
    localStorage.setItem('token', data.token)
    nav('/')
  }
  return (
    <form onSubmit={onSubmit} className="card" style={{display:'grid', gap:12, maxWidth:400}}>
      <h2>Create account</h2>
      <input placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})}/>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
      <button>Create</button>
    </form>
  )
}
