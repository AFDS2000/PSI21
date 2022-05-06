var express = require('express');
var router = express.Router();
const TeamController = require('../controllers/teamController');
const auth = require('../middleware/auth');

router.get('/', TeamController.getTeams);
router.put('/',  TeamController.addUserTeam);
router.put('/deleteUser', TeamController.deleteUser)
router.get('/:id', TeamController.getTeam);
router.post('/criarEquipa', TeamController.createTeam);

module.exports = router;