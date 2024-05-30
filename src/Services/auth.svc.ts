import jwt from "jsonwebtoken";
import shortUUID from "short-uuid";
import { Response } from "express";
import { authRepo } from "../repositories/auth.repo";
import { ValidatorRequest } from "../middlewares/requestValidator";
import { sendOtpMail } from "../email";
import { generateOTP } from "../utils";
import { otpRepo } from "../repositories/otp.repo";
import { OTP_STATUS } from "../constants";
import { domainSecret } from "../../.credentials.json";
import { IUser } from "../db/models/users";
import { omit, pick } from "lodash";

const login = async (req: ValidatorRequest, res: Response) => {
  const email = req.body.validated.email ?? "";
  const foundUser = await authRepo.find({ email });
  const ref = shortUUID.generate().toString();
  const otp = generateOTP(6);
  
  if (!foundUser) {
    const createdUser = await authRepo.create(email);
    const createdOTP = await otpRepo.create(createdUser.id, otp, ref);
    sendOtpMail(email, createdOTP.otp, createdOTP.ref);
  }

  if (foundUser) {
    const createdOTP = await otpRepo.create(foundUser.id, otp, ref);
    sendOtpMail(email, createdOTP.otp, createdOTP.ref);
  }

  return res.status(200).json({ status: "success", data: { ref, otp } });
};

const verifyOTP = async (req: ValidatorRequest, res: Response) => {
  const ref = req.body.validated.ref ?? "";
  const otp = req.body.validated.otp ?? "";
  const foundOtp = await otpRepo.findPendingByRef(ref, true);

  if (!foundOtp) {
    res.status(200).json({ status: "fail", message: "Invalid Verification" });
    return;
  }

  const sysOtp = foundOtp.otp;
  const sysTryAttempts = parseInt(foundOtp.tryAttempts as string);
  const sysMaxAttempts = parseInt(foundOtp.maxAttempts as string);
  const sysStatus = foundOtp.status;

  if (sysTryAttempts === sysMaxAttempts && sysStatus === OTP_STATUS.REJECTED) {
    res.status(200).json({
      status: "fail",
      message: `Invalid Verification: Max attempts reached!`,
    });
    return;
  }

  if (otp !== sysOtp) {
    const increasedAttempts = sysTryAttempts + 1;

    if (increasedAttempts === sysMaxAttempts) {
      await otpRepo.update(
        { ref },
        {
          tryAttempts: increasedAttempts.toString(),
          status: OTP_STATUS.REJECTED,
        }
      );
    } else {
      await otpRepo.update(
        { ref },
        { tryAttempts: increasedAttempts.toString() }
      );
    }

    res.status(200).json({
      status: "fail",
      message: `Invalid Verification: attempt ${increasedAttempts}`,
    });
    return;
  }

  const users = foundOtp.userId as unknown as IUser;
  const token = jwt.sign(pick(users, ["verification"]), domainSecret, {
    expiresIn: "1h",
  });

  await otpRepo.update({ ref }, { status: OTP_STATUS.APPROVE });

  return res.status(200).json({ status: "success", data: { token } });
};

const member = async (req: ValidatorRequest, res: Response) => {
  const verification = req.body.validated.verification ?? "";
  const foundUser = await authRepo.find({ verification });

  if (!foundUser) {
    res.status(200).json({
      status: "fail",
      message: "Invalid authorization!",
    });
    return;
  }

  const clone = { ...foundUser.toObject() };

  res.status(200).json({
    status: "success",
    data: omit(clone, ["createdAt", "updatedAt", "deletedAt", "__v"]),
  });
};

const memberUpdate = async (req: ValidatorRequest, res: Response) => {
  const userName = req.body.validated.userName ?? "";
  const verification = req.body.validated.verification ?? "";
  await authRepo.update({ verification }, { userName });

  res.json({ status: "success", data: { userName } });
};

export const authService = { login, verifyOTP, member, memberUpdate };
