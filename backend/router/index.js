import user from './userRoute.js';
import goal from './goalRoute.js';

export default (app) => {
	app.use(user);
	app.use(goal);
};
