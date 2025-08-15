import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function AdminPanel(){
  const [pend, setPend] = useState([])
  const [qr, setQr] = useState('')
  useEffect(()=>{
    api.get('/admin/requests?status=pending').then(r=>setPend(r.data))
    api.get('/admin/qr').then(r=>setQr(r.data.deposit_qr_url || ''))
  },[])
  async function act(id, type){
    await api.post(`/admin/requests/${id}/${type}`)
    setPend(pend.filter(x=>x.id!==id))
  }
  async function saveQR(){
    await api.post('/admin/qr', { url: qr })
    alert('QR updated')
  }
  return (
    <div className="grid1">
      <h2>Admin Panel</h2>
      <div className="grid1">
        <h3>Pending Requests</h3>
        {pend.map(r=>(
          <div key={r.id} className="card" style={{display:'flex', gap:8, alignItems:'center', justifyContent:'space-between'}}>
            <div>#{r.id} • {r.username} • {r.type} • ₹{Number(r.amount).toFixed(2)} • {r.utr_or_upi}</div>
            <div>
              <button className="pill" onClick={()=>act(r.id,'approve')}>Approve</button>{' '}
              <button className="pill" onClick={()=>act(r.id,'reject')}>Reject</button>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3>Deposit QR Image URL</h3>
        <input value={qr} onChange={e=>setQr(e.target.value)} style={{width:'100%'}} placeholder="https://...image.jpg"/>
        <div style={{marginTop:8}}><button className="pill" onClick={saveQR}>Save</button></div>
      </div>
    </div>
  )
}
