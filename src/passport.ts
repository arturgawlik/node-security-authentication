import { Express } from "express";
import passport from "passport";
import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth20";
import { CONFIG } from "./config.js";

const AUTH_OPTIONS: StrategyOptions = {
  callbackURL: "/auth/google/callback",
  clientID: CONFIG.CLIENT_ID,
  clientSecret: CONFIG.CLIENT_SECRET,
};

function verifyCb(
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: VerifyCallback
) {
  console.log("Google profile:", profile);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCb));

// save the session to cookie
passport.serializeUser((user, done) => {
  if (!("id" in user)) {
    throw new Error("There is no user id in data returned from google.");
  }

  done(null, user.id);
});

// read the session from cookie
passport.deserializeUser((id, done) => {
  if (!id) {
    throw new Error("id is falsy");
  }

  done(null, id);
});

// todo - to fix
export function passportMidleware(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());
  return () => {};
}
