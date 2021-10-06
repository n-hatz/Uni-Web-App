import express from 'express';
import controller from '../controllers/admin.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin',controller.sign_in);
router.get('/search',auth,controller.search_student);
router.get('/students/',auth,controller.get_students);
router.get('/students/:id',auth,controller.get_student_by_id);
router.post('/grades/:id',auth,controller.add_grade);
router.patch('/grades/:id',auth,controller.update_grade);
router.delete('/students/:id/grades/:grade_id',auth,controller.delete_grade);

export default router;