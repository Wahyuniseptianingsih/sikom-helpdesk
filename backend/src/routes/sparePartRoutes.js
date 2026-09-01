const express = require('express');
const router = express.Router();
const sparePartController = require('../controllers/sparePartController');
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');

router.get('/:ticket_id', verifyToken, sparePartController.getSparePartByTicket);
router.post('/', verifyToken, allowRoles(1,2), sparePartController.createSparePart);
router.delete('/:id', verifyToken, allowRoles(1,2), sparePartController.deleteSparePart);

module.exports = router;