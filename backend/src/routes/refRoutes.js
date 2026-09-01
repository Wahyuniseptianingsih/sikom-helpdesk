const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/kategori', verifyToken, (req, res) => {
  db.query('SELECT * FROM kategori_aset', (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal ambil kategori' });
    res.json(result);
  });
});

router.get('/lokasi', verifyToken, (req, res) => {
  db.query('SELECT * FROM lokasi', (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal ambil lokasi' });
    res.json(result);
  });
});

module.exports = router;