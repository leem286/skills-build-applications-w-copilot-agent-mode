import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running.' });
});

app.listen(PORT, async () => {
  console.log(`Backend listening on http://localhost:${PORT}`);

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB at', MONGO_URI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
});
