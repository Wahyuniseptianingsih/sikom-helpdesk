import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import './DashboardTeknisi.css'

function DashboardTeknisi() {
  const navigate = useNavigate()
  const nama = localStorage.getItem('nama')

  const [tickets, setTickets] = useState([])
  const [openForm, setOpenForm] = useState(null)
  const [openLog, setOpenLog] = useState(null)
  const [logs, setLogs] = useState([])
  const [status, setStatus] = useState('diproses')
  const [diagnosis, setDiagnosis] = useState('')
  const [tindakan, setTindakan] = useState('')

  const [spareParts, setSpareParts] = useState([])
  const [namaPart, setNamaPart] = useState('')
  const [qty, setQty] = useState(1)

  const loadTickets = () => {
    api.get('/tickets').then(res => setTickets(res.data))
  }

  useEffect(() => {
    loadTickets()
  }, [])

  const loadSpareParts = (ticket_id) => {
    api.get(`/sparepart/${ticket_id}`).then(res => setSpareParts(res.data))
  }

  const toggleForm = (id) => {
    if (openForm === id) {
      setOpenForm(null)
    } else {
      setOpenForm(id)
      setOpenLog(null)
      setStatus('diproses')
      setDiagnosis('')
      setTindakan('')
      setNamaPart('')
      setQty(1)
      loadSpareParts(id)
    }
  }

  const toggleLog = (id) => {
    if (openLog === id) {
      setOpenLog(null)
    } else {
      api.get(`/tickets/${id}/logs`).then(res => setLogs(res.data))
      setOpenLog(id)
      setOpenForm(null)
    }
  }

  const handleUpdate = async (id) => {
    try {
      await api.put(`/tickets/${id}/status`, { status, diagnosis, tindakan })
      setOpenForm(null)
      loadTickets()
    } catch (err) {
      alert(err.response?.data?.message || 'gagal update status')
    }
  }

  const handleAddSparePart = async (ticket_id) => {
    if (!namaPart) return
    try {
      await api.post('/sparepart', { ticket_id, nama_part: namaPart, qty })
      setNamaPart('')
      setQty(1)
      loadSpareParts(ticket_id)
    } catch (err) {
      alert(err.response?.data?.message || 'gagal tambah spare part')
    }
  }

  const handleDeleteSparePart = async (id, ticket_id) => {
    try {
      await api.delete(`/sparepart/${id}`)
      loadSpareParts(ticket_id)
    } catch (err) {
      alert(err.response?.data?.message || 'gagal hapus spare part')
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

      <div className="dash-card">
        <h3>Semua Tiket</h3>
        {tickets.length === 0 && <p>belum ada tiket masuk</p>}
        {tickets.map(t => (
          <div className="ticket-item" key={t.id}>
            <h4>{t.judul}</h4>
            <div className="ticket-meta">
              <span className={`badge badge-${t.status}`}>{t.status}</span>
              <span className={`badge badge-${t.prioritas}`}>{t.prioritas}</span>
            </div>
            <p>{t.deskripsi}</p>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="ticket-toggle" onClick={() => toggleForm(t.id)}>
                {openForm === t.id ? 'Tutup' : 'Update Status'}
              </button>
              <button className="ticket-toggle" onClick={() => toggleLog(t.id)}>
                {openLog === t.id ? 'Tutup Histori' : 'Lihat Histori'}
              </button>
            </div>

            {openForm === t.id && (
              <div className="ticket-form">
                <select className="dash-select" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="open">Open</option>
                  <option value="diproses">Diproses</option>
                  <option value="selesai">Selesai</option>
                </select>
                <textarea className="dash-textarea" rows="2" placeholder="Diagnosis" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} />
                <textarea className="dash-textarea" rows="2" placeholder="Tindakan" value={tindakan} onChange={e => setTindakan(e.target.value)} />
                <button className="dash-btn-sm" onClick={() => handleUpdate(t.id)}>Simpan Status</button>

                <hr style={{ margin: '14px 0', border: 'none', borderTop: '1px dashed #ddd' }} />

                <p style={{ fontSize: '13px', fontWeight: 700, color: '#6B4E9E', margin: '0 0 8px' }}>Spare Part Dipakai</p>

                {spareParts.map(sp => (
                  <div key={sp.id} className="sparepart-item">
                    <span>{sp.nama_part} x{sp.qty}</span>
                    <button className="btn-delete-sm" onClick={() => handleDeleteSparePart(sp.id, t.id)}>Hapus</button>
                  </div>
                ))}

                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <input
                    className="dash-input-sm"
                    placeholder="Nama part (misal: Kabel Power)"
                    value={namaPart}
                    onChange={e => setNamaPart(e.target.value)}
                  />
                  <input
                    className="dash-input-sm"
                    type="number"
                    min="1"
                    style={{ width: '60px' }}
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                  />
                  <button className="dash-btn-sm" onClick={() => handleAddSparePart(t.id)}>Tambah</button>
                </div>
              </div>
            )}

            {openLog === t.id && (
              <div className="ticket-form">
                {logs.length === 0 && <p style={{ fontSize: '13px', color: '#888' }}>belum ada histori</p>}
                {logs.map(l => (
                  <div key={l.id} className="log-item">
                    <div className="ticket-meta">
                      <span className={`badge badge-${l.status}`}>{l.status}</span>
                      <span style={{ fontSize: '11px', color: '#999' }}>{new Date(l.updated_at).toLocaleString('id-ID')}</span>
                    </div>
                    <p style={{ margin: '4px 0', fontSize: '13px' }}><b>Ditangani oleh:</b> {l.teknisi_nama}</p>
                    <p style={{ margin: '4px 0', fontSize: '13px' }}><b>Diagnosis:</b> {l.diagnosis || '-'}</p>
                    <p style={{ margin: '4px 0', fontSize: '13px' }}><b>Tindakan:</b> {l.tindakan || '-'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardTeknisi