import mongoose, { Types } from "mongoose";
import { OTP_STATUS } from "../../../constants";
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

export interface IOtp {
  userId: Types.ObjectId | null;
  otp: string | null;
  ref: string | null;
  status: string | null;
  tryAttempts: string | null;
  maxAttempts: string | null ;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

const otpSchema = new mongoose.Schema<IOtp>({
  userId: { type: mongoose.Types.ObjectId, ref: "user", default: null },
  otp: { type: String, default: null },
  ref: { type: String, default: null },
  status: { type: String, default: OTP_STATUS.PENDING },
  tryAttempts: {type: String, default: "0"},
  maxAttempts: {type: String, default: process.env.OTP_MAX_ATTEMPTS},
  createdAt: { type: Date, default: null },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

export const OTP = mongoose.model<IOtp>("otp", otpSchema);
