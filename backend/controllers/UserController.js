import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

class UserController {
	// @desc   Register new user
	// @route  POST /api/user
	// @access Public
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
			res.status(201).send({
				_id: user.id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id)
			});
		} catch (err) {
			res.status(400).send(err);
		}
	}

	// @desc   Login user
	// @route  POST /api/user/login
	// @access Public
	static async loginUser(req, res) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });
			if (user && (await bcrypt.compare(password, user.password))) {
				res.status(200).send({
					_id: user.id,
					name: user.name,
					email: user.email,
					token: generateToken(user._id)
				});
			} else res.status(400).send({ error: 'invalid credentials' });
		} catch (err) {
			res.status(400).send(err);
		}
	}

	// @desc   Get user data
	// @route  GET /api/user/me
	// @access Private
	static async getData(req, res) {
		try {
			const { _id, name, email } = await User.findById(req.user.id);

			res.status(200).send({ id: _id, name, email });
		} catch (err) {
			res.status(400).send(err);
		}
	}
}

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default UserController;
