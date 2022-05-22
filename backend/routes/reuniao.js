const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const reuniaoController = require('../controllers/reuniaoController')

router.get('/:id', auth, reuniaoController.getMeetingsByUser);
router.post('/criarReuniao', auth, reuniaoController.criarReuniao);

module.exports = router;