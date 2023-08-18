const { TaskPage, AddTask } = require('../controllers/TaskController');
const { uploads } = require('../middleware/multer');

const router = require('express').Router()

router.get("/viewTask", TaskPage)
router.post("/addTask", uploads.single('image'), AddTask)

module.exports = router;