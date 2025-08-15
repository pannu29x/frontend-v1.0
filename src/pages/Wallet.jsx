import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Wallet(){
  const [data, setData] = useState({ balance: 0, requests: [], deposit_qr_url: null})
  const [dep, setDep] = useState({ amount:'', utr:'' })
  const [wd, setWd] = useState({ amount:'', upi:'' })
  useEffect(()=>{ api.get('/wallet').then(r=>setData(r.data)) },[])
  async function sendDep(e){ e.preventDefault(); await api.post('/wallet/deposit-requests', {...dep, amount:Number(dep.amount)}); alert('Deposit request sent') }
  async function sendWd(e){ e.preventDefault(); await api.post('/wallet/withdraw-requests', {...wd, amount:Number(wd.amount)}); alert('Withdraw request sent') }
  return (
    <div className="grid1">
      <h2>Wallet • Balance: ₹{Number(data.balance).toFixed(2)}</h2>
      <div className="grid2">
        <form onSubmit={sendDep} className="card">
          <h3>Deposit</h3>
          {data.deposit_qr_url ? <img src={data.deposit_qr_url} style={{maxWidth:200}}/> : <em>QR not set by admin</em>}
          <input placeholder="Amount (₹)" value={dep.amount} onChange={e=>setDep({...dep, amount:e.target.value})}/>
          <input placeholder="UTR No." value={dep.utr} onChange={e=>setDep({...dep, utr:e.target.value})}/>
          <button>Send Request</button>
        </form>
        <form onSubmit={sendWd} className="card">
          <h3>Withdraw</h3>
          <input placeholder="Amount (₹)" value={wd.amount} onChange={e=>setWd({...wd, amount:e.target.value})}/>
          <input placeholder="UPI ID" value={wd.upi} onChange={e=>setWd({...wd, upi:e.target.value})}/>
          <button>Send Request</button>
        </form>
      </div>
      <div className="card">
        <h3>Requests</h3>
        <table border="1" cellPadding="6" style={{width:'100%'}}>
          <thead><tr><th>ID</th><th>Type</th><th>Amount</th><th>UTR/UPI</th><th>Status</th></tr></thead>
          <tbody>
            {data.requests.map(r=>(<tr key={r.id}>
              <td>{r.id}</td><td>{r.type}</td><td>₹{Number(r.amount).toFixed(2)}</td><td>{r.utr_or_upi}</td><td>{r.status}</td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
