const express = require('express');
const router = express.Router();

const authConstroller = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signup', auth, authConstroller.signup);
router.post('/login', authConstroller.login);

module.exports = router;