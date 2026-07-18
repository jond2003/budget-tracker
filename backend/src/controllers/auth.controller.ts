import { NextFunction, Request, Response } from "express";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session?.userId) {
      return res.json({ authenticated: true });
    }

    return res.json({
      authenticated: false
    }).status(401);
  } catch (err) {
    next(err); 
  }
}