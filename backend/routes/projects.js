const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController')


router.post('/criarProjeto', projectController.criarProjeto);

router.get('/listaProjetos', projectController.getProject);

router.get('', projectController.getProject);
router.put('', projectController.updateTeam);
router.put('/tasks', projectController.updateTasks);
module.exports = router;