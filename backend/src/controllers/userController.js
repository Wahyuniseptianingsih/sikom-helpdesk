const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModel');

const register = (req, res) => {
  const { nama, email, password, role_id } = req.body;

  if (!nama || !email || !password) {
    return res.status(400).json({ message: 'data belum lengkap' });
  }

  const hashed = bcrypt.hashSync(password, 10);

  createUser({ nama, email, pass: hashed, role_id }, (err, result) => {
    if (err) {
      console.log('error register:', err);
      return res.status(500).json({ message: 'gagal register' });
    }
    res.json({ message: 'user berhasil dibuat' });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'email atau password salah' });
    }

    const user = results[0];
    const cocok = bcrypt.compareSync(password, user.pass);

    if (!cocok) {
      return res.status(400).json({ message: 'email atau password salah' });
    }

    const token = jwt.sign(
      { id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, nama: user.nama, role_id: user.role_id });
  });
};

module.exports = { register, login };