import cookieSession from "cookie-session";
import { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { CONFIG } from "./config.js";
import { passportMidleware } from "./passport.js";

export default function () {
  return function (req: Request, res: Response, next: NextFunction) {
    helmet()(req, res, () => {
      cookieSession({
        name: "session",
        maxAge: 24 * 60 * 60 * 1000,
        keys: [CONFIG.COOKIE_KEY_1, CONFIG.COOKIE_KEY_2],
      })(req, res, () => {
        passportMidleware()(req, res, next);
      });
    });
  };
}
