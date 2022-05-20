const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.get('/', auth, taskController.all);
router.get('/:id', auth, taskController.getTaskUser)
router.post('/add', auth, taskController.add);
router.delete('/delete/:id', auth, taskController.delete);
router.post('/edit-users/:id', auth, taskController.editUsers);
router.post('/update-percentage', auth, taskController.updatePercentage);
router.post('/set-timestamps/:id', auth, taskController.setTimestamps);

module.exports = router;