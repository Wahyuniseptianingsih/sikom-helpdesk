const maintenanceModel = require('../models/maintenanceModel');

const getAllMaintenance = (req, res) => {
  maintenanceModel.getAll((err, result) => {
    if (err) return res.status(500).json({ message: 'gagal ambil data maintenance' });
    res.json(result);
  })
}

const getMaintenanceById = (req, res) => {
  maintenanceModel.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal ambil data maintenance' });
    if (result.length === 0) return res.status(404).json({ message: 'data nggak ketemu' });
    res.json(result[0]);
  })
}

const getMaintenanceByAsset = (req, res) => {
  maintenanceModel.getByAssetId(req.params.asset_id, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal ambil histori maintenance' });
    res.json(result);
  })
}

const createMaintenance = (req, res) => {
  const { asset_id, tgl, keterangan } = req.body;

  if (!asset_id || !tgl) {
    return res.status(400).json({ message: 'asset_id sama tanggal wajib diisi' });
  }

  maintenanceModel.create({ asset_id, tgl, keterangan }, (err, result) => {
    if (err) {
      console.log('error create maintenance', err)
      return res.status(500).json({ message: 'gagal nyatet maintenance' });
    }
    res.status(201).json({ message: 'maintenance berhasil dicatet' });
  })
}

const deleteMaintenance = (req, res) => {
  maintenanceModel.remove(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal hapus data maintenance' });
    res.json({ message: 'data maintenance dihapus' });
  })
}

module.exports = { getAllMaintenance, getMaintenanceById, getMaintenanceByAsset, createMaintenance, deleteMaintenance };