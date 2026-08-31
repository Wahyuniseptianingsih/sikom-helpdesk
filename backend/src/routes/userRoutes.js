const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const { verifyToken, isAdmin, isTeknisi, isPegawai } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'kamu berhasil akses route yang dilindungi', user: req.user });
});

router.get('/admin-only', verifyToken, isAdmin, (req, res) => {
  res.json({ message: 'ini khusus admin' });
});

router.get('/teknisi-only', verifyToken, isTeknisi, (req, res) => {
  res.json({ message: 'ini khusus teknisi' });
});

router.get('/pegawai-only', verifyToken, isPegawai, (req, res) => {
  res.json({ message: 'ini khusus pegawai' });
});

module.exports = router;