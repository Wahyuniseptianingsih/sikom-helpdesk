import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import './DashboardAdmin.css'

function DashboardAdmin() {
  const navigate = useNavigate()
  const nama = localStorage.getItem('nama')
  const [tab, setTab] = useState('overview')

  const [tickets, setTickets] = useState([])
  const [assets, setAssets] = useState([])
  const [kategoriList, setKategoriList] = useState([])
  const [lokasiList, setLokasiList] = useState([])
  const [users, setUsers] = useState([])

  const emptyForm = {
    kode_aset: '', nama_alat: '', kategori_id: '', merk: '', model: '',
    no_seri: '', thn_beli: '', status_barang: 'baik', lokasi_id: ''
  }
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')

  const emptyUserForm = { nama: '', email: '', password: '', role_id: 3 }
  const [userForm, setUserForm] = useState(emptyUserForm)
  const [userMsg, setUserMsg] = useState('')

  const loadAll = () => {
    api.get('/tickets').then(res => setTickets(res.data))
    api.get('/assets').then(res => setAssets(res.data))
    api.get('/ref/kategori').then(res => setKategoriList(res.data))
    api.get('/ref/lokasi').then(res => setLokasiList(res.data))
    api.get('/users').then(res => setUsers(res.data))
  }

  useEffect(() => {
    loadAll()
  }, [])

  const totalTiket = tickets.length
  const tiketOpen = tickets.filter(t => t.status === 'open').length
const tiketDiproses = tickets.filter(t => t.status === 'diproses').length
const tiketSelesai = tickets.filter(t => t.status === 'selesai').length
  const totalAset = assets.length

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      if (editId) {
        await api.put(`/assets/${editId}`, form)
        setMsg('aset berhasil diupdate')
      } else {
        await api.post('/assets', form)
        setMsg('aset berhasil ditambahkan')
      }
      setForm(emptyForm)
      setEditId(null)
      loadAll()
    } catch (err) {
      setMsg(err.response?.data?.message || 'gagal simpan aset')
    }
  }

  const handleEdit = (a) => {
    setForm({
      kode_aset: a.kode_aset || '',
      nama_alat: a.nama_alat || '',
      kategori_id: a.kategori_id || '',
      merk: a.merk || '',
      model: a.model || '',
      no_seri: a.no_seri || '',
      thn_beli: a.thn_beli || '',
      status_barang: a.status_barang || 'baik',
      lokasi_id: a.lokasi_id || ''
    })
    setEditId(a.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('yakin mau hapus aset ini?')) return
    try {
      await api.delete(`/assets/${id}`)
      loadAll()
    } catch (err) {
      alert(err.response?.data?.message || 'gagal hapus aset')
    }
  }

  const cancelEdit = () => {
    setForm(emptyForm)
    setEditId(null)
  }

  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value })
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    setUserMsg('')
    try {
      await api.post('/users/register', userForm)
      setUserMsg('user berhasil dibuat')
      setUserForm(emptyUserForm)
      loadAll()
    } catch (err) {
      setUserMsg(err.response?.data?.message || 'gagal bikin user')
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

      <div className="tab-bar">
        <button className={`tab-btn ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
        <button className={`tab-btn ${tab === 'tiket' ? 'active' : ''}`} onClick={() => setTab('tiket')}>Tiket</button>
        <button className={`tab-btn ${tab === 'aset' ? 'active' : ''}`} onClick={() => setTab('aset')}>Aset</button>
        <button className={`tab-btn ${tab === 'user' ? 'active' : ''}`} onClick={() => setTab('user')}>User</button>
      </div>

      {tab === 'overview' && (
  <>
    <div className="stat-grid">
      <div className="stat-card">
        <p className="stat-num">{totalTiket}</p>
        <p className="stat-label">Total Tiket</p>
      </div>
      <div className="stat-card">
        <p className="stat-num">{tiketOpen}</p>
        <p className="stat-label">Tiket Open</p>
      </div>
      <div className="stat-card">
        <p className="stat-num">{tiketSelesai}</p>
        <p className="stat-label">Tiket Selesai</p>
      </div>
      <div className="stat-card">
        <p className="stat-num">{totalAset}</p>
        <p className="stat-label">Total Aset</p>
      </div>
    </div>

    <div className="chart-card">
      <h3>Perbandingan Status Tiket</h3>

      <div className="bar-row">
        <span className="bar-label">Open</span>
        <div className="bar-track">
          <div
  className="bar-fill open"
  style={{ width: totalTiket ? `${(tiketOpen / totalTiket) * 100}%` : '0%' }}
>
  {tiketOpen} ({totalTiket ? Math.round((tiketOpen / totalTiket) * 100) : 0}%)
</div>
        </div>
      </div>

      <div className="bar-row">
        <span className="bar-label">Diproses</span>
        <div className="bar-track">
          <div
  className="bar-fill diproses"
  style={{ width: totalTiket ? `${(tiketDiproses / totalTiket) * 100}%` : '0%' }}
>
  {tiketDiproses} ({totalTiket ? Math.round((tiketDiproses / totalTiket) * 100) : 0}%)
</div>
        </div>
      </div>

      <div className="bar-row">
        <span className="bar-label">Selesai</span>
        <div className="bar-track">
          <div
  className="bar-fill selesai"
  style={{ width: totalTiket ? `${(tiketSelesai / totalTiket) * 100}%` : '0%' }}
>
  {tiketSelesai} ({totalTiket ? Math.round((tiketSelesai / totalTiket) * 100) : 0}%)
</div>
        </div>
      </div>
    </div>
  </>
)}

      {tab === 'tiket' && (
        <div className="dash-card">
          <h3>Semua Tiket</h3>
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
      )}

      {tab === 'aset' && (
        <div className="dash-card">
          <h3>{editId ? 'Edit Aset' : 'Tambah Aset'}</h3>
          {msg && <p>{msg}</p>}
          <form onSubmit={handleSubmit}>
            <div className="asset-form-grid">
              <input className="dash-input" name="kode_aset" placeholder="Kode aset" value={form.kode_aset} onChange={handleChange} required />
              <input className="dash-input" name="nama_alat" placeholder="Nama alat" value={form.nama_alat} onChange={handleChange} required />

              <select className="dash-select" name="kategori_id" value={form.kategori_id} onChange={handleChange} required>
                <option value="">Pilih kategori</option>
                {kategoriList.map(k => <option key={k.id} value={k.id}>{k.kategori}</option>)}
              </select>

              <select className="dash-select" name="lokasi_id" value={form.lokasi_id} onChange={handleChange} required>
                <option value="">Pilih lokasi</option>
                {lokasiList.map(l => <option key={l.id} value={l.id}>{l.nama_lokasi}</option>)}
              </select>

              <input className="dash-input" name="merk" placeholder="Merk" value={form.merk} onChange={handleChange} />
              <input className="dash-input" name="model" placeholder="Model" value={form.model} onChange={handleChange} />
              <input className="dash-input" name="no_seri" placeholder="No seri" value={form.no_seri} onChange={handleChange} />
              <input className="dash-input" name="thn_beli" type="number" placeholder="Tahun beli" value={form.thn_beli} onChange={handleChange} />

              <select className="dash-select" name="status_barang" value={form.status_barang} onChange={handleChange}>
                <option value="baik">Baik</option>
                <option value="rusak ringan">Rusak Ringan</option>
                <option value="rusak berat">Rusak Berat</option>
              </select>
            </div>

            <button className="dash-btn" type="submit">{editId ? 'Update Aset' : 'Tambah Aset'}</button>
            {editId && <button type="button" className="dash-btn" style={{ background: '#999', marginTop: '8px' }} onClick={cancelEdit}>Batal Edit</button>}
          </form>

          <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />

          <h3>Daftar Aset</h3>
          {assets.length === 0 && <p>belum ada aset</p>}
          {assets.map(a => (
            <div className="asset-item" key={a.id}>
              <div className="asset-info">
                <h4>{a.nama_alat} ({a.kode_aset})</h4>
                <p>{a.merk} {a.model} - {a.status_barang}</p>
              </div>
              <div className="asset-actions">
                <button className="btn-edit" onClick={() => handleEdit(a)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(a.id)}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'user' && (
        <div className="dash-card">
          <h3>Tambah User Baru</h3>
          {userMsg && <p>{userMsg}</p>}
          <form onSubmit={handleCreateUser}>
            <div className="asset-form-grid">
              <input className="dash-input" name="nama" placeholder="Nama" value={userForm.nama} onChange={handleUserChange} required />
              <input className="dash-input" name="email" type="email" placeholder="Email" value={userForm.email} onChange={handleUserChange} required />
              <input className="dash-input" name="password" type="password" placeholder="Password" value={userForm.password} onChange={handleUserChange} required />
              <select className="dash-select" name="role_id" value={userForm.role_id} onChange={handleUserChange}>
                <option value="1">Admin</option>
                <option value="2">Teknisi</option>
                <option value="3">Pegawai</option>
              </select>
            </div>
            <button className="dash-btn" type="submit">Buat User</button>
          </form>

          <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />

          <h3>Daftar User</h3>
          {users.length === 0 && <p>belum ada user</p>}
          {users.map(u => (
            <div className="user-item" key={u.id}>
              <div>
                <h4>{u.nama}</h4>
                <p>{u.email}</p>
              </div>
              <span className="role-tag">{u.role_name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardAdmin