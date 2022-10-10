import GoalController from '../controllers/GoalController.js';
import protect from '../middleware/authMiddleware.js';
import { Router } from 'express';
const router = Router();

router
	.get('/api/goals', protect, GoalController.getGoals)
	.post('/api/goals', protect, GoalController.postGoals)
	.put('/api/goals/:id', protect, GoalController.editGoals)
	.delete('/api/goals/:id', protect, GoalController.deleteGoals);

export default router;
