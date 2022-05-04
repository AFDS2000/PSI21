var express = require('express');
var router = express.Router();
const TeamController = require('../controllers/teamController');


//var project_controller = requeire();



//Routers Projects
/*
router.get('/projects', project_controller.projects_list)

router.post('/createProject', project_controller.project_create);
*/

//Routers Tasks



//Routers Team
router.post('/criarEquipa', TeamController.createTeam);


module.exports = router;