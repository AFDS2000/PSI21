var express = require('express');
var router = express.Router();
var taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
/* GET home page. */

router.post('/', auth,taskController.add);

router.get('/all',auth, taskController.all);

router.delete('/:id',auth, taskController.delete);

module.exports = router;