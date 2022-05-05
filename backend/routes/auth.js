const express = require('express');
const router = express.Router();

const userConstroller = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signup', auth, userConstroller.signup);
router.post('/login', userConstroller.login);
router.get('/:id', userConstroller.getUser)

module.exports = router;