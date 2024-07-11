const express = require('express');
const {login} = require('../controllers/user.js');
const verifyToken = require('../middlewares/auth.js');

const router = express.Router();

router.post('/login', verifyToken, login);

module.exports = router;
