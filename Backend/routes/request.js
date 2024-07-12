const express = require('express');
const { createRequest, getRequestById, getAllRequestsByUser } = require('../controllers/request.js');
const verifyToken = require('../middlewares/auth.js');
const router = express.Router();

router.post('/', verifyToken, createRequest);
router.get('/:requestId', getRequestById);
router.get('/', verifyToken, getAllRequestsByUser);

module.exports = router;