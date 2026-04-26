import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import releasesRouter from './routes/releases.js';
import { RELEASE_STEPS } from './config/steps.js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

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
