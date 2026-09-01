const db = require('../config/db');

const getAll = (callback) => {
    db.query('SELECT * FROM tickets ORDER BY created_at DESC', callback);
}

const getById = (id, callback) => {
  db.query('SELECT * FROM tickets WHERE id = ?', [id], callback);
};
const create = (data, callback) => {
  const { judul, kategori, prioritas, deskripsi, asset_id, pelapor_id } = data
  console.log('data ticket masuk', data); // debug doang, nanti hapus
  db.query(
    'INSERT INTO tickets (judul, kategori, prioritas, deskripsi, asset_id, pelapor_id) VALUES (?, ?, ?, ?, ?, ?)',
    [judul, kategori, prioritas || 'medium', deskripsi, asset_id, pelapor_id],
    callback
  );
}

const updateStatus = (id, status, teknisi_id, callback) => {
  db.query('UPDATE tickets SET status = ?, teknisi_id = ? WHERE id = ?', [status, teknisi_id, id], callback);
};

const remove = (id, callback) => {
  db.query('DELETE FROM tickets WHERE id = ?', [id], callback)
};
const addLog = (data, callback) => {
  const { ticket_id, diagnosis, tindakan, status, teknisi_id } = data
  db.query(
    'INSERT INTO ticket_log (ticket_id, diagnosis, tindakan, status, teknisi_id) VALUES (?, ?, ?, ?, ?)',
    [ticket_id, diagnosis, tindakan, status, teknisi_id],
    callback
  )
}

const getLogsByTicketId = (ticket_id, callback) => {
  db.query(
    'SELECT ticket_log.*, users.nama AS teknisi_nama FROM ticket_log JOIN users ON ticket_log.teknisi_id = users.id WHERE ticket_id = ? ORDER BY updated_at DESC',
    [ticket_id],
    callback
  )
}

module.exports = { getAll, getById, create, updateStatus, remove, addLog, getLogsByTicketId };