const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const projectController = require('../controllers/projectController')

router.get('', auth, projectController.getProject);
router.put('', auth, projectController.updateTeam);
router.get('/listaProjetos', auth, projectController.getProject);
router.put('/tasks', auth, projectController.updateTasks);
router.post('/criarProjeto', auth, projectController.criarProjeto);

module.exports = router;