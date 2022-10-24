import Goal from '../models/goalModel.js';
import User from '../models/userModel.js';

class GoalController {
	// @desc   Get all user's goals
	// @route  GET /api/goals
	// @access Private
	static async getGoals(req, res) {
		try {
			const goals = await Goal.find({ user: req.user.id });
			res.status(200).send(goals);
		} catch (err) {
			res.status(400).send(err);
		}
	}

	// @desc   Create new goal
	// @route  POST /api/goals
	// @access Private
	static async postGoals(req, res) {
		try {
			await Goal.create({ user: req.user.id, text: req.body.text });
			return res.status(201).send({ success: 'goal created' });
		} catch (err) {
			res.status(400).send(err);
		}
	}

	// @desc   Edit selected goal
	// @route  PUT /api/goals/:id
	// @access Private
	static async editGoals(req, res) {
		try {
			const goal = await Goal.findById(req.params.id);
			if (!goal)
				return res
					.status(404)
					.send({ error: `goal of id ${goal} does not exist` });

			const user = await User.findById(req.user.id);

			// Check for user
			if (!user) return res.status(401).send({ error: 'User not found' });

			// Check if logged user matches the goal user
			if (goal.user.toString() !== user.id)
				return res.status(401).send({ error: 'user not authorized' });

			const goalUpdated = await Goal.findByIdAndUpdate(goal, req.body, {
				new: true
			});
			return res.status(200).send(goalUpdated);
		} catch (err) {
			res.status(400).send(err);
		}
	}

	// @desc   Delete selected goal
	// @route  DELETE /api/goals/:id
	// @access Private
	static async deleteGoals(req, res) {
		try {
			const goal = await Goal.findById(req.params.id);
			if (!goal) return res.status(404).send({ error: 'goal not found' });

			const user = await User.findById(req.user.id);

			// Check for user
			if (!user) return res.status(401).send({ error: 'User not found' });

			// Check if logged user matches the goal user
			if (goal.user.toString() !== user.id)
				return res.status(401).send({ error: 'user not authorized' });
			await goal.remove();

			return res
				.status(200)
				.send({ success: `goal deleted, id: ${req.params.id}` });
		} catch (err) {
			res.status(400).send(err);
		}
	}
}

export default GoalController;
