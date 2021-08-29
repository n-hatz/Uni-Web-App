import express from 'express';
import controller from '../controllers/posts.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/',controller.get_posts);
router.post('/new',auth,controller.new_post);
router.post('/comment/:id',auth,controller.add_comment);
router.delete('/comment',auth,controller.delete_comment);
router.get('/:id',controller.post_details);
router.patch('/:id',auth,controller.edit_post);
router.delete('/:id',auth,controller.delete_post);

export default router;