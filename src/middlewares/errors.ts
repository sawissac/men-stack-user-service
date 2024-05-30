import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  res.status(500);
  res.json({ status: "fail", message: err });
};
