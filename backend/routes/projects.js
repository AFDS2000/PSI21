const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController')

router.get('', projectController.getProject);
router.put('', projectController.updateTeam);
router.get('/listaProjetos', projectController.getProject);
router.put('/tasks', projectController.updateTasks);
router.post('/criarProjeto', projectController.criarProjeto);

module.exports = router;