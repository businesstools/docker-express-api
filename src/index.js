import express from 'express';
import morgan from 'morgan';

const app = express.Router();

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send(":-)");
});

export function init() {
  // initialize db connections etc. here
  return Promise.resolve();
}

export function cleanup() {
  // close db connections etc. here
}

export default app;
