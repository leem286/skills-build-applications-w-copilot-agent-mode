import { Schema, model, Document } from 'mongoose';

export interface WorkoutDocument extends Document {
  title: string;
  difficulty: string;
  durationMinutes: number;
  focus: string;
  createdAt: Date;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);

const WorkoutModel = model<WorkoutDocument>('Workout', workoutSchema);
export default WorkoutModel;
