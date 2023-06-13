import express from 'express';
import { deleteTask, getMyTask, newTask, updateTask } from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/new",isAuthenticated,newTask)

router.get("/my",isAuthenticated,getMyTask)
//inke upar vale ke alava kuch bhi hoga ye run hoga niche vala ya ise consider krega
router.route("/:id").put(updateTask).delete(deleteTask);

export default router