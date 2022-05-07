var express = require('express');
var router = express.Router();

const TeamController = require('../controllers/teamController');
const auth = require('../middleware/auth');

router.get('/', auth, TeamController.getTeams);
router.put('/', auth,  TeamController.addUserTeam);
router.put('/deleteUser', auth, TeamController.deleteUser)
router.get('/:id', auth, TeamController.getTeam);
router.post('/criarEquipa', auth, TeamController.createTeam);

module.exports = router;