var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/usersController');
const auth = require('../middleware/auth');



router.get('/', UsersController.getUsers);
module.exports = router;