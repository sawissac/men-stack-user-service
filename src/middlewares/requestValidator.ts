import z from "zod";
import jwt from "jsonwebtoken";
import { domainSecret } from "../../.credentials.json";
import { NextFunction, Request, Response } from "express";

export type ValidatorRequest = Request<
  any,
  any,
  {
    validated: {
      email?: string;
      ref?: string;
      otp?: string;
      verification?: string;
      userName?: string;
    };
  }
>;

const rules = {
  email: z.string().trim().email().min(5).max(50),
  otp: z.string().trim().min(6).max(6),
  ref: z.string().trim(),
  userName: z.string().trim().min(5).max(30),
};

export const requestValidator = {
  verifyToken: (req: ValidatorRequest, _: Response, next: NextFunction) => {
    const bearerAuth = req.headers["authorization"];
    if (typeof bearerAuth !== "undefined") {
      const bearer = bearerAuth.split(" ");
      const token = bearer.at(1) ?? "";
      const { verification } = jwt.verify(token, domainSecret) as {
        verification: string;
      };

      if (!req.body.validated) {
        req.body.validated = { verification: "" };
      }

      req.body.validated.verification = verification;
      next();
    }
  },

  authLogin: (req: ValidatorRequest, _: Response, next: NextFunction) => {
    const authLoginSchema = z.object({
      email: rules.email,
    });

    const { email } = authLoginSchema.parse(req.body);

    if (!req.body.validated) {
      req.body.validated = { email: "" };
    }

    req.body.validated.email = email;

    next();
  },

  verifyOtp: (req: ValidatorRequest, _: Response, next: NextFunction) => {
    const verifyOtpSchema = z.object({
      ref: rules.ref,
      otp: rules.otp,
    });

    const { ref, otp } = verifyOtpSchema.parse(req.body);

    if (!req.body.validated) {
      req.body.validated = { ref: "", otp: "" };
    }

    req.body.validated.ref = ref;
    req.body.validated.otp = otp;

    next();
  },

  verifyMember: (req: ValidatorRequest, _: Response, next: NextFunction) => {
    const verifyMemberSchema = z.object({
      update: z.object({
        userName: rules.userName,
      }),
    });

    const {
      update: { userName },
    } = verifyMemberSchema.parse(req.body);

    if (!req.body.validated) {
      req.body.validated = { userName: "" };
    }

    req.body.validated.userName = userName;

    next();
  },
};
