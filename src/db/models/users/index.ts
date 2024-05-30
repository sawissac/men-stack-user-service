import mongoose, { Types } from "mongoose";

export interface IUser {
  email: string;
  userName: string;
  verification: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, default: null },
  userName: { type: String, default: null },
  verification: { type: String, default: null },
  createdAt: { type: Date, default: null },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

export const User = mongoose.model<IUser>("user", userSchema);
