import GoalController from '../controllers/GoalController.js';
import { Router } from 'express';
const router = Router();

router
	.get('/api/goals', GoalController.getGoals)
	.post('/api/goals', GoalController.postGoals)
	.put('/api/goals/:id', GoalController.editGoals)
	.delete('/api/goals/:id', GoalController.deleteGoals);

export default router;
