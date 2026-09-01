const db = require('../config/db');

const getByTicketId = (ticket_id, callback) => {
  db.query('SELECT * FROM spare_part WHERE ticket_id = ?', [ticket_id], callback)
}

const create = (data, callback) => {
  const { ticket_id, nama_part, qty } = data
  db.query(
    'INSERT INTO spare_part (ticket_id, nama_part, qty) VALUES (?, ?, ?)',
    [ticket_id, nama_part, qty || 1],
    callback
  )
}

const remove = (id, callback) => {
  db.query('DELETE FROM spare_part WHERE id = ?', [id], callback)
}

module.exports = { getByTicketId, create, remove };