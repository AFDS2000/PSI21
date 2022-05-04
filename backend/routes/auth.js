const express = require('express');
const router = express.Router();

const userConstroller = require('../controllers/authController');
const auth = require('../middleware/auth');

router.get('', auth, userConstroller.getAllUsers);
router.post('/signup', auth, userConstroller.signup);
router.post('/login', userConstroller.login);

module.exports = router;