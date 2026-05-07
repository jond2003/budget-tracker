import { Request, Response, NextFunction } from 'express';

const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorised. Log in' });
  }
  next();
};

export default requireLogin;
