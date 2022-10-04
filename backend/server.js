import express from 'express';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`running on port ${port}`));
