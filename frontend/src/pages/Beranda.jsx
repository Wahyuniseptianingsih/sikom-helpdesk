import { useNavigate } from 'react-router-dom'
import './Beranda.css'

function Beranda() {
  const navigate = useNavigate()

  return (
    <div className="beranda-wrap">
      <div className="beranda-logo">SIKOM</div>

      <div className="beranda-content">
        <h1 className="beranda-title">Kelola aset & keluhan kantor jadi lebih mudah?</h1>
        <p className="beranda-desc">Lapor kerusakan alat, pantau progress perbaikan, dan kelola aset kantor dalam satu sistem.</p>
        <button className="beranda-btn" onClick={() => navigate('/login')}>Login</button>
                <img src="/cat.gif" alt="kucing lucu" className="beranda-cat" />
      </div>

      <div className="beranda-footer">
        Dibuat oleh Wahyuni Septianingsih
      </div>
    </div>
  )
}

export default Beranda