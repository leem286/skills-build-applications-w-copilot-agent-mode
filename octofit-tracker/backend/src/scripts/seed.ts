// Seed the octofit_db database with test data
import { connectDb } from '../db.js';
import UserModel from '../models/user.js';
import TeamModel from '../models/team.js';
import ActivityModel from '../models/activity.js';
import LeaderboardEntryModel from '../models/leaderboardEntry.js';
import WorkoutModel from '../models/workout.js';

async function run() {
  console.log('Seed the octofit_db database with test data');
  await connectDb();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardEntryModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.insertMany([
    { name: 'Ava Walker', email: 'ava.walker@example.com', role: 'athlete' },
    { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'coach' },
    { name: 'Mia Chen', email: 'mia.chen@example.com', role: 'athlete' },
  ]);

  const workouts = await WorkoutModel.insertMany([
    { title: 'Morning HIIT Blast', difficulty: 'Intermediate', durationMinutes: 30, focus: 'cardio' },
    { title: 'Strength Builder', difficulty: 'Advanced', durationMinutes: 45, focus: 'strength' },
    { title: 'Recovery Flow', difficulty: 'Beginner', durationMinutes: 25, focus: 'mobility' },
  ]);

  const activities = await ActivityModel.insertMany([
    {
      userId: users[0]._id,
      type: 'run',
      durationMinutes: 35,
      caloriesBurned: 420,
      date: new Date('2026-06-07'),
    },
    {
      userId: users[2]._id,
      type: 'yoga',
      durationMinutes: 50,
      caloriesBurned: 180,
      date: new Date('2026-06-06'),
    },
  ]);

  const teams = await TeamModel.insertMany([
    {
      name: 'Velocity Squad',
      memberIds: [users[0]._id, users[2]._id],
      members: 2,
      focus: 'endurance',
    },
    {
      name: 'Core Crushers',
      memberIds: [users[1]._id],
      members: 1,
      focus: 'strength',
    },
  ]);

  const leaderboardEntries = await LeaderboardEntryModel.insertMany([
    { rank: 1, userId: users[0]._id, name: users[0].name, score: 1420 },
    { rank: 2, userId: users[2]._id, name: users[2].name, score: 1325 },
    { rank: 3, userId: users[1]._id, name: users[1].name, score: 1180 },
  ]);

  console.log('Seed complete:');
  console.log(`  Users: ${users.length}`);
  console.log(`  Teams: ${teams.length}`);
  console.log(`  Activities: ${activities.length}`);
  console.log(`  Workouts: ${workouts.length}`);
  console.log(`  Leaderboard entries: ${leaderboardEntries.length}`);
  process.exit(0);
}

run().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
