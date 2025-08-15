import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { Link } from 'react-router-dom'

export default function Home(){
  const [items, setItems] = useState([])
  useEffect(()=>{ api.get('/challenges').then(r=>setItems(r.data)) },[])
  return (
    <div className="grid1">
      <h2>Active Challenges</h2>
      {items.map(it=>(
        <div key={it.id} className="card">
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <strong>#{it.id} • {it.title}</strong>
            <span>by <Link to={`/profile/${it.creator_username}`}>@{it.creator_username}</Link></span>
          </div>
          {it.media_url && <img src={`http://localhost:5000${it.media_url}`} style={{maxWidth:'100%', borderRadius:8}}/>}
          <div style={{display:'flex', gap:12, marginTop:8}}>
            <Vote id={it.id} />
            <Comment id={it.id} />
            <button onClick={()=>navigator.clipboard.writeText(window.location.origin+'/challenge/'+it.id)}>Share</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function Vote({id}){
  const [msg, setMsg] = useState('Vote')
  async function vote(){
    try{
      const { data } = await api.post(`/challenges/${id}/vote`)
      setMsg(`Voted (+₹${data.credited.toFixed(2)})`)
    }catch(e){ setMsg(e.response?.data?.error || 'Error') }
  }
  return <button onClick={vote}>{msg}</button>
}
function Comment({id}){
  const [text, setText] = useState('')
  async function send(){
    if(!text.trim()) return
    await api.post(`/challenges/${id}/comments`, { text })
    setText('')
    alert('Comment added')
  }
  return <div style={{display:'flex', gap:8}}>
    <input value={text} onChange={e=>setText(e.target.value)} placeholder="Write a comment..." />
    <button onClick={send}>Send</button>
  </div>
}
