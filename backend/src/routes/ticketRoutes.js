const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');

router.get('/', verifyToken, ticketController.getAllTickets);
router.get('/:id', verifyToken, ticketController.getTicketById);
router.get('/:id/logs', verifyToken, ticketController.getTicketLogs);

router.post('/', verifyToken, allowRoles(3), ticketController.createTicket);

router.put('/:id/status', verifyToken, allowRoles(1,2), ticketController.updateTicketStatus)

router.delete('/:id', verifyToken, allowRoles(1), ticketController.deleteTicket);

module.exports = router;