const express = require('express');
const router = express.Router();
const Transaction = require('../controllers/Transaction.controller');
const authMiddleware = require('../utils/authMiddleware');

router.post('/', authMiddleware, Transaction.createTransaction);
router.get('/history', authMiddleware, Transaction.getHistory);
router.get('/:id', authMiddleware, Transaction.getTransactionById);

module.exports = router;
