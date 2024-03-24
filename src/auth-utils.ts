import { NextFunction, Request, Response } from "express";

export function checkLoggedIn(req: Request, res: Response, next: NextFunction) {
  const loggedIn = req.isAuthenticated() && req.user;
  if (!loggedIn) {
    return res.status(401).json({
      error: "You must log in.",
    });
  }
  next();
}
