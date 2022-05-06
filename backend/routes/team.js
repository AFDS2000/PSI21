var express = require('express');
var router = express.Router();
const TeamController = require('../controllers/teamController');
const auth = require('../middleware/auth');

//Routers Team
router.post('/criarEquipa', TeamController.createTeam);

router.get('/', TeamController.getTeams);

router.get('/:id', TeamController.getTeam);

router.put('/',  TeamController.addUserTeam);

module.exports = router;