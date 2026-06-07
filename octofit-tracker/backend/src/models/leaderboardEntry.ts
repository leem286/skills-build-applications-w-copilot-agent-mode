import { Schema, model, Document, Types } from 'mongoose';

export interface LeaderboardEntryDocument extends Document {
  rank: number;
  userId: Types.ObjectId;
  name: string;
  score: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    rank: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { timestamps: false }
);

const LeaderboardEntryModel = model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);
export default LeaderboardEntryModel;
