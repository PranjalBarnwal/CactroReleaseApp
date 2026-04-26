import express from 'express';
import { Release } from '../models/Release.js';
import { computeStatus } from '../utils/status.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const releases = await Release.getAll();
    const releasesWithStatus = releases.map(release => ({
      ...release,
      status: computeStatus(release.completed_steps)
    }));
    res.json(releasesWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const release = await Release.getById(req.params.id);
    if (!release) {
      return res.status(404).json({ error: 'Release not found' });
    }
    res.json({
      ...release,
      status: computeStatus(release.completed_steps)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, date, additionalInfo } = req.body;
    if (!name || !date) {
      return res.status(400).json({ error: 'Name and date are required' });
    }
    const release = await Release.create(name, date, additionalInfo);
    res.status(201).json({
      ...release,
      status: computeStatus(release.completed_steps)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/steps', async (req, res) => {
  try {
    const { completedSteps } = req.body;
    const release = await Release.updateSteps(req.params.id, completedSteps);
    if (!release) {
      return res.status(404).json({ error: 'Release not found' });
    }
    res.json({
      ...release,
      status: computeStatus(release.completed_steps)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/info', async (req, res) => {
  try {
    const { additionalInfo } = req.body;
    const release = await Release.updateInfo(req.params.id, additionalInfo);
    if (!release) {
      return res.status(404).json({ error: 'Release not found' });
    }
    res.json({
      ...release,
      status: computeStatus(release.completed_steps)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Release.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
