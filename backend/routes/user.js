const express = require('express');
const router = express.Router();

const userConstroller = require('../controllers/userController');

router.get('/searchUsers', userConstroller.getUsers);

module.exports = router;