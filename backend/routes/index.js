var express = require('express');
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

module.exports = router;