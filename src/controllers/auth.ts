import { Request, Response } from "express";
import { authService } from "../Services/auth.svc";

const login = (req: Request, res: Response) => {
  authService.login(req, res);
};

const verifyOTP = (req: Request, res: Response) => {
  authService.verifyOTP(req, res);
};

const member = (req: Request, res: Response) => {
  authService.member(req, res);
};

const memberUpdate = (req: Request, res: Response) => {
  authService.memberUpdate(req, res);
};

export const authController = { login, verifyOTP, member, memberUpdate };
