import express from 'express';
import dotenv from 'dotenv';
import router from './router/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);

app.get('/api/goals', (_, res) => {
	res.send({ message: 'Get Goals' });
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
