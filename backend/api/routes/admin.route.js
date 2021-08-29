import express from 'express';
import controller from '../controllers/admin.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin',controller.sign_in);
router.get('/student/:id',auth,controller.get_student);
router.post('/grades/:id',auth,controller.add_grade);
router.patch('/grades/:id',auth,controller.update_grade);
router.delete('/grade/:id',auth,controller.delete_grade);

export default router;