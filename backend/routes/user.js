const express = require('express');
const router = express.Router();

const userConstroller = require('../controllers/userController');

router.get('/searchUsers', userConstroller.searchUsers);
router.get('/', userConstroller.getUsers)
router.get('/:id', userConstroller.getUser);

module.exports = router;