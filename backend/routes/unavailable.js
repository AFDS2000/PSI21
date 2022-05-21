const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const unConstroller = require('../controllers/unavailableController');

//periods: [{ start: {type: Date, required: true}, end: {type: Date, required: true}}], //mongoose shit

router.post('/', auth, unConstroller.addDay);
//router.get('/:id', auth, unConstroller.getDay);

module.exports = router;