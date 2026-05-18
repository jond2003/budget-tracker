import { NextFunction, Request, Response } from "express";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session?.userId) {
      return res.json({ authenticated: true });
    }

    return res.status(401).json({
      authenticated: false
    });
  } catch (err) {
    next(err); 
  }
}