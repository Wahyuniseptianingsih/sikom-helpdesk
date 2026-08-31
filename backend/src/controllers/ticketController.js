const ticketModel = require('../models/ticketModel');

const getAllTickets = (req, res) => {
  ticketModel.getAll((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'gagal ambil data tiket' });
    }
    res.json(result);
  });
}

const getTicketById = (req, res) => {
  ticketModel.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal ambil data tiket' });
    if (result.length === 0) {
      return res.status(404).json({ message: 'tiket nggak ketemu' });
    }
    res.json(result[0]);
  });
};

const createTicket = (req, res) => {
  const { judul, kategori, prioritas, deskripsi, asset_id } = req.body;

  if (!judul) {
    return res.status(400).json({ message: 'judul wajib diisi woy' });
  }

  const data = {
    judul, kategori, prioritas, deskripsi, asset_id,
    pelapor_id: req.user.id
  }

  ticketModel.create(data, (err, result) => {
    if (err) {
      console.log('error create ticket', err)
      return res.status(500).json({ message: 'gagal bikin tiket' });
    }
    res.status(201).json({ message: 'tiket berhasil dibuat' });
  })
}
const updateTicketStatus = (req, res) => {
  const { status, diagnosis, tindakan } = req.body
  const teknisi_id = req.user.id
  const ticket_id = req.params.id

  if(!status){
    return res.status(400).json({message: 'status kosong'})
  }

  ticketModel.updateStatus(ticket_id, status, teknisi_id, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal update status' });

    ticketModel.addLog({ ticket_id, diagnosis, tindakan, status, teknisi_id }, (err2) => {
      if (err2) console.log('gagal nyatet log', err2)
      res.json({ message: 'status tiket berhasil diupdate' });
    })
  });
}

const getTicketLogs = (req, res) => {
  ticketModel.getLogsByTicketId(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal ambil log tiket' });
    res.json(result)
  })
}

const deleteTicket = (req, res) => {
  ticketModel.remove(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal hapus tiket' });
    res.json({ message: 'tiket dihapus' });
  });
};

module.exports = { getAllTickets, getTicketById, createTicket, updateTicketStatus, getTicketLogs, deleteTicket };