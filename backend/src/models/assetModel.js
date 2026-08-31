const db = require('../config/db');

const getAll = (callback) => {
  db.query('SELECT * FROM assets', callback);
};

const getById = (id, callback) => {
  db.query('SELECT * FROM assets WHERE id = ?', [id], callback);
};

const create = (data, callback) => {
  const { kode_aset, nama_alat, kategori_id, merk, model, no_seri, thn_beli, status_barang, lokasi_id, user_id } = data;
  db.query(
    'INSERT INTO assets (kode_aset, nama_alat, kategori_id, merk, model, no_seri, thn_beli, status_barang, lokasi_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [kode_aset, nama_alat, kategori_id, merk, model, no_seri, thn_beli, status_barang, lokasi_id, user_id],
    callback
  );
};

const update = (id, data, callback) => {
  const { kode_aset, nama_alat, kategori_id, merk, model, no_seri, thn_beli, status_barang, lokasi_id, user_id } = data;
  db.query(
    'UPDATE assets SET kode_aset=?, nama_alat=?, kategori_id=?, merk=?, model=?, no_seri=?, thn_beli=?, status_barang=?, lokasi_id=?, user_id=? WHERE id=?',
    [kode_aset, nama_alat, kategori_id, merk, model, no_seri, thn_beli, status_barang, lokasi_id, user_id, id],
    callback
  );
};

const remove = (id, callback) => {
  db.query('DELETE FROM assets WHERE id = ?', [id], callback);
};

module.exports = { getAll, getById, create, update, remove };