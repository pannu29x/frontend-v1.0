import React, { useState } from 'react'
import { api } from '../api'

export default function CreateChallenge(){
  const [form, setForm] = useState({ title:'', description:'', match_type:'random', opponent_username:'' })
  const [file, setFile] = useState(null)
  async function submit(e){
    e.preventDefault()
    const fd = new FormData()
    Object.entries(form).forEach(([k,v])=>fd.append(k,v))
    if(file) fd.append('media', file)
    await api.post('/challenges', fd, { headers:{ 'Content-Type':'multipart/form-data' } })
    window.location.href = '/'
  }
  return (
    <form onSubmit={submit} className="card" style={{display:'grid', gap:12}}>
      <h2>Create Challenge (₹10 entry)</h2>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
      <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
      <select value={form.match_type} onChange={e=>setForm({...form, match_type:e.target.value})}>
        <option value="random">Random match</option>
        <option value="manual">Manual select</option>
      </select>
      {form.match_type==='manual' && <input placeholder="Opponent username" value={form.opponent_username} onChange={e=>setForm({...form, opponent_username:e.target.value})}/>}
      <input type="file" onChange={e=>setFile(e.target.files[0])}/>
      <button>Create</button>
    </form>
  )
}
