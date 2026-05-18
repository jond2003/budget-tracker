import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

export const getInflow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);

  } catch (err) {
    next(err);
  }
}