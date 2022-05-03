const express = require('express');
const router = express.Router();

const userConstroller = require('../controllers/authController')

router.get('', userConstroller.getAllUsers);
router.post('/signup', userConstroller.signup);
router.post('/login', userConstroller.login);

module.exports = router;
