import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes.js';

const app= express();
app.use(bodyParser.json());

const origin="http://localhost:3000";
app.use(cors());
app.use(routes);


app.listen(8000, () => console.log('Server is running on port 8000'));