import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { useParams } from 'react-router-dom'

export default function Profile(){
  const { username } = useParams()
  const [p, setP] = useState(null)
  useEffect(()=>{ api.get('/social/profile/'+username).then(r=>setP(r.data)) },[username])
  if(!p) return 'Loading...'
  return (
    <div className="card" style={{display:'grid', gap:8}}>
      <h2>@{p.username}</h2>
      <div>Followers: {p.followers} • Following: {p.following} • Mutuals: {p.mutuals}</div>
    </div>
  )
}
