import UserController from '../controllers/UserController.js';
import protect from '../middleware/authMiddleware.js';
import { Router } from 'express';
const router = Router();

router
	.post('/api/user', UserController.registerUser)
	.post('/api/user/login', UserController.loginUser)
	.get('/api/user/me', protect, UserController.getData);

export default router;
