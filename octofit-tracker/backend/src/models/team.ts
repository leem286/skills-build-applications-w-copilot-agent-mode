import { Schema, model, Document, Types } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  memberIds: Types.ObjectId[];
  members: number;
  focus: string;
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    members: { type: Number, required: true, default: 0 },
    focus: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);

const TeamModel = model<TeamDocument>('Team', teamSchema);
export default TeamModel;
