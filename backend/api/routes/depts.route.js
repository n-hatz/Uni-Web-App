import express from 'express';
import controller from '../controllers/depts.controller.js';

const router = express.Router();

router.get('/',controller.get_depts);

export default router;