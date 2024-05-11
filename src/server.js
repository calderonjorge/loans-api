import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { routes } from './routes/index.js';

export const app = express();
export const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
