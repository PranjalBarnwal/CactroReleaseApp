import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import releasesRouter from './routes/releases.js';
import { RELEASE_STEPS } from './config/steps.js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Release Checklist API', status: 'running' });
});

app.get('/api/steps', (req, res) => {
  res.json(RELEASE_STEPS);
});

app.use('/api/releases', releasesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
