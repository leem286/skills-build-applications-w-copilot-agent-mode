import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  role: string;
  joinedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'athlete' },
    joinedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);

const UserModel = model<UserDocument>('User', userSchema);
export default UserModel;
