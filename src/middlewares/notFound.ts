import { Request, Response } from "express";

export const notFound = (_: Request, res: Response) => {
  res.status(404);
  res.json({ status: "fail", message: "Api route not found!" });
};
