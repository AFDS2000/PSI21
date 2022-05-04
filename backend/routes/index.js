var express = require('express');
var router = express.Router();
var teamController = require('../controllers/teamController');
var taskController = require('../controllers/taskController');

//var project_controller = requeire();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teams', teamController.teams_list);

router.get('/task/all', taskController.all);

router.post('/task', taskController.add);

router.delete('/task/:id', taskController.delete);

//Routers Projects
/*
router.get('/projects', project_controller.projects_list)

router.post('/createProject', project_controller.project_create);
*/

//Routers Tasks



//Routers Team

module.exports = router;