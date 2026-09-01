const sparePartModel = require('../models/sparePartModel');

const getSparePartByTicket = (req, res) => {
  sparePartModel.getByTicketId(req.params.ticket_id, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal ambil data spare part' });
    res.json(result);
  })
}

const createSparePart = (req, res) => {
  const { ticket_id, nama_part, qty } = req.body

  if (!ticket_id || !nama_part) {
    return res.status(400).json({ message: 'ticket_id sama nama part wajib diisi' });
  }

  sparePartModel.create({ ticket_id, nama_part, qty }, (err, result) => {
    if (err) {
      console.log('error create spare part', err)
      return res.status(500).json({ message: 'gagal simpan spare part' });
    }
    res.status(201).json({ message: 'spare part berhasil dicatet' });
  })
}

const deleteSparePart = (req, res) => {
  sparePartModel.remove(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal hapus spare part' });
    res.json({ message: 'spare part dihapus' });
  })
}

module.exports = { getSparePartByTicket, createSparePart, deleteSparePart };