import express from 'express';
import controller from '../controllers/student.controller.js';

const router = express.Router();

router.post('/signin',controller.sign_in);
router.post('/signup',controller.sign_up);

export default router;