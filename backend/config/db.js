import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			'mongodb+srv://brunonasc:brunonasc@cluster1.2xjmdrq.mongodb.net/mernapp?retryWrites=true&w=majority'
		);
		console.log(`database connected ${conn.connection.host}`.cyan.underline);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

export default connectDB;
