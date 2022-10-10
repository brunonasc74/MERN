import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
	let token;

	if (
		req.header.authorization &&
		req.header.authorizathion.startsWith('Bearer')
	) {
		try {
			// Get token from header
			token = req.header.authorization.split(' ')[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user from token
			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (err) {
			console.log(err);
			res.status(401).send({ error: 'Not authorized' });
		}
	}
	if (!token)
		return res.status(401).send({ error: 'Not authorized, no token' });
};

export default protect;
