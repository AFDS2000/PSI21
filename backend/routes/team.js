var express = require('express');
var router = express.Router();
const TeamController = require('../controllers/teamController');

//Routers Team
router.post('/', TeamController.createTeam);

router.get('/', TeamController.getTeam);

module.exports = router;