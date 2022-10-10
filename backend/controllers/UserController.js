import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

class UserController {
	static async registerUser(req, res) {
		try {
			const { name, email, password } = req.body;
			if (!name || !email || !password)
				return res.status(400).send({ error: 'please enter all fields' });

			const userExists = await User.findOne({ email });
			if (userExists)
				return res.status(400).send({ error: 'user already exists' });

			// Hash password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			// Create user
			const user = await User.create({
				name,
				email,
				password: hashedPassword
			});
			if (!user) return res.status(400).send({ error: 'invalid user data' });
			res
				.status(201)
				.send({ _id: user.id, name: user.name, email: user.email });
		} catch (err) {
			res.status(400).send(err);
		}
	}

	static async loginUser(req, res) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });
			if (user && (await bcrypt.compare(password, user.password))) {
				res
					.status(200)
					.send({ _id: user.id, name: user.name, email: user.email });
			} else res.status(400).send({ error: 'invalid credentials' });
		} catch (err) {
			res.status(400).send(err);
		}
	}

	static async getData(req, res) {
		res.send('user data display');
	}
}

export default UserController;
