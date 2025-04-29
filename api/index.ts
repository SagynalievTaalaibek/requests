import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const run = async () => {
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
