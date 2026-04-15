const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const {
  createTaskValidator,
  updateTaskValidator,
} = require("../validators/taskValidator");

router.use(auth);

router.post("/", createTaskValidator, createTask);
router.get("/", getTasks);
router.put("/:id", updateTaskValidator, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;