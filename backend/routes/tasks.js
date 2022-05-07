const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.get('/', auth, taskController.all);
router.get('/:id', auth, taskController.getTaskUser)
router.post('/add', auth, taskController.add);
router.delete('/delete/:id', auth, taskController.delete);

module.exports = router;