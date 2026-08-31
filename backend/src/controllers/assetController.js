const assetModel = require('../models/assetModel');

const getAllAssets = (req, res) => {
  assetModel.getAll((err, result) => {
    if (err) return res.status(500).json({ message: 'gagal ambil data aset' });
    res.json(result);
  });
};

const getAssetById = (req, res) => {
  assetModel.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal ambil data aset' });
    if (result.length === 0) return res.status(404).json({ message: 'aset nggak ditemukan' });
    res.json(result[0]);
  });
};

const createAsset = (req, res) => {
  assetModel.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal tambah aset' });
    res.status(201).json({ message: 'aset berhasil ditambahkan' });
  });
};

const updateAsset = (req, res) => {
  assetModel.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal update aset' });
    res.json({ message: 'aset berhasil diupdate' });
  });
};

const deleteAsset = (req, res) => {
  assetModel.remove(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'gagal hapus aset' });
    res.json({ message: 'aset berhasil dihapus' });
  });
};

module.exports = { getAllAssets, getAssetById, createAsset, updateAsset, deleteAsset };