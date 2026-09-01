const db = require('../config/db');

const getAll = (callback) => {
  db.query('SELECT * FROM maintenance_log ORDER BY tgl DESC', callback);
}

const getById = (id, callback) => {
  db.query('SELECT * FROM maintenance_log WHERE id = ?', [id], callback);
}

const getByAssetId = (asset_id, callback) => {
  db.query('SELECT * FROM maintenance_log WHERE asset_id = ? ORDER BY tgl DESC', [asset_id], callback);
}

const create = (data, callback) => {
  const { asset_id, tgl, keterangan } = data
  db.query(
    'INSERT INTO maintenance_log (asset_id, tgl, keterangan) VALUES (?, ?, ?)',
    [asset_id, tgl, keterangan],
    callback
  )
}

const remove = (id, callback) => {
  db.query('DELETE FROM maintenance_log WHERE id = ?', [id], callback)
}

module.exports = { getAll, getById, getByAssetId, create, remove };