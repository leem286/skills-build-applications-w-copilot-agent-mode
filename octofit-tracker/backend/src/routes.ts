import { Router } from 'express';
import UserModel from './models/user.js';
import TeamModel from './models/team.js';
import ActivityModel from './models/activity.js';
import LeaderboardEntryModel from './models/leaderboardEntry.js';
import WorkoutModel from './models/workout.js';

const router = Router();

router.get('/users', async (_req, res) => {
  const users = await UserModel.find().lean();
  res.json({ users });
});

router.post('/users', async (req, res) => {
  const user = await UserModel.create(req.body);
  res.status(201).json(user);
});

router.get('/teams', async (_req, res) => {
  const teams = await TeamModel.find().populate('memberIds').lean();
  res.json({ teams });
});

router.post('/teams', async (req, res) => {
  const team = await TeamModel.create(req.body);
  res.status(201).json(team);
});

router.get('/activities', async (_req, res) => {
  const activities = await ActivityModel.find().populate('userId').lean();
  res.json({ activities });
});

router.post('/activities', async (req, res) => {
  const activity = await ActivityModel.create(req.body);
  res.status(201).json(activity);
});

router.get('/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntryModel.find().sort({ rank: 1 }).lean();
  res.json({ leaderboard });
});

router.get('/workouts', async (_req, res) => {
  const workouts = await WorkoutModel.find().lean();
  res.json({ workouts });
});

router.post('/workouts', async (req, res) => {
  const workout = await WorkoutModel.create(req.body);
  res.status(201).json(workout);
});

export default router;
