const { TaskPage, AddTask, deleteTask, updateTask } = require('../controllers/TaskController');
const { uploads } = require('../middleware/multer');

const router = require('express').Router()

router.get("/viewTask", TaskPage)
router.post("/addTask", uploads.single('image'), AddTask)
router.delete('/deleteTask/:id', deleteTask)
router.post("/editTask",uploads.single('image'), updateTask)

module.exports = router;