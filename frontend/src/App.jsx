import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Beranda from './pages/Beranda'
import Login from './pages/Login'
import DashboardAdmin from './pages/DashboardAdmin'
import DashboardTeknisi from './pages/DashboardTeknisi'
import DashboardPegawai from './pages/DashboardPegawai'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/teknisi" element={<DashboardTeknisi />} />
        <Route path="/pegawai" element={<DashboardPegawai />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App