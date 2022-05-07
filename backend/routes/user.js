const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userConstroller = require('../controllers/userController');

router.get('/searchUsers', auth, userConstroller.searchUsers);
router.get('/', auth, userConstroller.getUsers)
router.get('/:id', auth, userConstroller.getUser);

module.exports = router;