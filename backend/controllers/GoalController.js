class GoalController {
	static async getGoals(_, res) {
		res.status(200).send({ id: 1, message: 'GET successful' });
	}

	static async postGoals(req, res) {
		const info = req.body;
		if (!info) return res.status(400).send({ error: 'empty value, testing' });
		res.status(201).send(info);
	}

	static async editGoals(req, res) {
		res.status(200).send(req.params);
	}

	static async deleteGoals(req, res) {
		res.status(200).send(req.params);
	}
}

export default GoalController;
