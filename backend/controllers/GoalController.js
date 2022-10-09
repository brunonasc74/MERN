import Goal from '../models/goalModel.js';

class GoalController {
	static async getGoals(_, res) {
		try {
			const goals = await Goal.find();
			res.status(200).send(goals);
		} catch (err) {
			res.status(400).send(err);
		}
	}

	static async postGoals(req, res) {
		try {
			await Goal.create({ text: req.body.text });
			return res.status(201).send({ success: 'goal created' });
		} catch (err) {
			res.status(400).send(err);
		}
	}

	static async editGoals(req, res) {
		try {
			const goal = await Goal.findById(req.params.id);
			if (!goal)
				return res
					.status(404)
					.send({ error: `goal of id ${goal} does not exist` });
			const goalUpdated = await Goal.findByIdAndUpdate(goal, req.body, {
				new: true
			});
			return res.status(200).send(goalUpdated);
		} catch (err) {
			res.status(400).send(err);
		}
	}

	static async deleteGoals(req, res) {
		try {
			const goal = await Goal.findById(req.params.id);
			if (!goal) return res.status(404).send({ error: 'goal not found' });
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
