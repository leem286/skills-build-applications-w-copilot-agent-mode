import mongoose from 'mongoose';

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDb() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB at', MONGO_URI);
}
