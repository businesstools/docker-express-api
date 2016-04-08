import express from 'express';
import morgan from 'morgan';

const app = express.Router();

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send(":-)");
});

export default app;
