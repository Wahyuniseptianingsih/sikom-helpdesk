const db = require('../config/db');

const findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

const createUser = (data, callback) => {
  const { nama, email, pass, role_id } = data;
  db.query(
    'INSERT INTO users (nama, email, pass, role_id) VALUES (?, ?, ?, ?)',
    [nama, email, pass, role_id],
    callback
  );
};

module.exports = { findUserByEmail, createUser };