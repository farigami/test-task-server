const Router = require('express')
const taskController = require('../controllers/taskController')
const router = new Router()
const TaskController = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, TaskController.create)
router.post('/change', authMiddleware, taskController.change)
router.get('/getresponsible', authMiddleware, taskController.get_responsibles)
router.get('/get', authMiddleware, taskController.get)



module.exports = router