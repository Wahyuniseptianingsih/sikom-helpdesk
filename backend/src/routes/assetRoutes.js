const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');

router.get('/', verifyToken, assetController.getAllAssets);
router.get('/:id', verifyToken, assetController.getAssetById);
router.post('/', verifyToken, allowRoles(1, 2), assetController.createAsset);
router.put('/:id', verifyToken, allowRoles(1, 2), assetController.updateAsset);
router.delete('/:id', verifyToken, allowRoles(1), assetController.deleteAsset);

module.exports = router;