import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await api.post('/users/login', { email, password })
      const { token, role_id, nama } = res.data

      localStorage.setItem('token', token)
      localStorage.setItem('role_id', role_id)
      localStorage.setItem('nama', nama)

      if (role_id === 1) navigate('/admin')
      else if (role_id === 2) navigate('/teknisi')
      else if (role_id === 3) navigate('/pegawai')
      else navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'login gagal, cek lagi email/password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h1 className="login-title">SIKOM</h1>
        <p className="login-subtitle">Masuk ke akunmu</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <Link className="login-back" to="/">Kembali ke beranda</Link>
      </div>
    </div>
  )
}

export default Login