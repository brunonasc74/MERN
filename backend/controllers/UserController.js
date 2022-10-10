import User from '../models/userModel.js';

class UserController {
	static async registerUser(req, res) {
		res.send('register user');
	}

	static async loginUser(req, res) {
		res.send('login user');
	}

	static async getData(req, res) {
		res.send('user data display');
	}
}

export default UserController;
