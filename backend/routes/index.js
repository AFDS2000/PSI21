var express = require('express');
const team = require('../models/team');
var router = express.Router();


//var project_controller = requeire();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Routers Projects
/*
router.get('/projects', project_controller.projects_list)

router.post('/createProject', project_controller.project_create);
*/

//Routers Tasks



//Routers Team
  
  const TeamController = require('../controllers/teamController');

  router.post('/createTeam', TeamController.createTeam);


module.exports = router;