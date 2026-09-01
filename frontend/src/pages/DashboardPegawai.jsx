import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import './DashboardPegawai.css'

function getUserIdFromToken() {
  const token = localStorage.getItem('token')
  if (!token) return null
  const payload = JSON.parse(atob(token.split('.')[1]))
  return payload.id
}

function DashboardPegawai() {
  const navigate = useNavigate()
  const nama = localStorage.getItem('nama')
  const userId = getUserIdFromToken()

  const [tickets, setTickets] = useState([])
  const [judul, setJudul] = useState('')
  const [kategori, setKategori] = useState('hardware')
  const [prioritas, setPrioritas] = useState('medium')
  const [deskripsi, setDeskripsi] = useState('')
  const [msg, setMsg] = useState('')

  const loadTickets = () => {
    api.get('/tickets').then(res => {
      const punyaSendiri = res.data.filter(t => t.pelapor_id === userId)
      setTickets(punyaSendiri)
    })
  }

  useEffect(() => {
    loadTickets()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      await api.post('/tickets', { judul, kategori, prioritas, deskripsi })
      setMsg('tiket berhasil dibuat')
      setJudul('')
      setDeskripsi('')
      loadTickets()
    } catch (err) {
      setMsg(err.response?.data?.message || 'gagal bikin tiket')
    }
  }

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="dash-wrap">
      <div className="dash-header">
        <h2>Halo, {nama}</h2>
        <button className="dash-logout" onClick={logout}>Logout</button>
      </div>

      <div className="dash-grid">
        <div className="dash-card">
          <h3>Lapor Kerusakan</h3>
          {msg && <p>{msg}</p>}
          <form onSubmit={handleSubmit}>
            <input className="dash-input" placeholder="Judul keluhan" value={judul} onChange={e => setJudul(e.target.value)} required />
            <select className="dash-select" value={kategori} onChange={e => setKategori(e.target.value)}>
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="jaringan">Jaringan</option>
            </select>
            <select className="dash-select" value={prioritas} onChange={e => setPrioritas(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <textarea className="dash-textarea" rows="4" placeholder="Jelaskan kerusakannya" value={deskripsi} onChange={e => setDeskripsi(e.target.value)} required />
            <button className="dash-btn" type="submit">Kirim Laporan</button>
          </form>
        </div>

        <div className="dash-card">
          <h3>Tiket Saya</h3>
          {tickets.length === 0 && <p>belum ada tiket</p>}
          {tickets.map(t => (
            <div className="ticket-item" key={t.id}>
              <h4>{t.judul}</h4>
              <div className="ticket-meta">
                <span className={`badge badge-${t.status}`}>{t.status}</span>
                <span className={`badge badge-${t.prioritas}`}>{t.prioritas}</span>
              </div>
              <p>{t.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPegawai