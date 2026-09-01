const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');

router.get('/', verifyToken, maintenanceController.getAllMaintenance);
router.get('/:id', verifyToken, maintenanceController.getMaintenanceById);
router.get('/asset/:asset_id', verifyToken, maintenanceController.getMaintenanceByAsset);

router.post('/', verifyToken, allowRoles(1,2), maintenanceController.createMaintenance);

router.delete('/:id', verifyToken, allowRoles(1), maintenanceController.deleteMaintenance);

module.exports = router;