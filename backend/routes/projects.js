const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController')


router.post('/criarProjeto', projectController.criarProjeto);

router.get('', projectController.getProject);

module.exports = router;