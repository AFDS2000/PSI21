const express = require('express');
const router = express.Router();


const unConstroller = require('../controllers/unavailableController');
const auth = require('../middleware/auth');

router.post('/', auth, unConstroller.addDay);

module.exports = router;