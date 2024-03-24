import { createServer } from "node:https";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import express from "express";
import helmet from "helmet";
import passport from "passport";
import cookieSession from "cookie-session";
import { CONFIG } from "./config.js";
import { checkLoggedIn } from "./auth-utils.js";
import { passportMidleware } from "./passport.js";

const PORT = 3000;

const app = express();

// const AUTH_OPTIONS: StrategyOptions = {
//   callbackURL: "/auth/google/callback",
//   clientID: CONFIG.CLIENT_ID,
//   clientSecret: CONFIG.CLIENT_SECRET,
// };

// function verifyCb(
//   accessToken: string,
//   refreshToken: string,
//   profile: any,
//   done: VerifyCallback
// ) {
//   console.log("Google profile:", profile);
//   done(null, profile);
// }

// passport.use(new Strategy(AUTH_OPTIONS, verifyCb));

// // save the session to cookie
// passport.serializeUser((user, done) => {
//   if (!("id" in user)) {
//     throw new Error("There is no user id in data returned from google.");
//   }

//   done(null, user.id);
// });

// // read the session from cookie
// passport.deserializeUser((id, done) => {
//   if (!id) {
//     throw new Error("id is falsy");
//   }

//   done(null, id);
// });

app.use(helmet());
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [CONFIG.COOKIE_KEY_1, CONFIG.COOKIE_KEY_2],
  })
);
app.use(passportMidleware(app));
// app.use(passport.initialize());
// app.use(passport.session());

// function checkLoggedIn(req: Request, res: Response, next: NextFunction) {
//   const loggedIn = req.isAuthenticated() && req.user;
//   if (!loggedIn) {
//     return res.status(401).json({
//       error: "You must log in.",
//     });
//   }
//   next();
// }

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
  })
);

app.get("/auth/logout", (req, res) => {
  req.logout(() => {});
  return res.redirect("/");
});

app.get("/secret", checkLoggedIn, (req, res) => {
  res.send("Your secret is 42!");
});

app.get("/failure", (req, res) => {
  res.send("Failed to log in.");
});

app.get("/", (req, res) => {
  res.sendFile(join(import.meta.dirname, "..", "public", "index.html"));
});

createServer(
  {
    key: readFileSync(new URL("../key.pem", import.meta.url)),
    cert: readFileSync(new URL("../cert.pem", import.meta.url)),
  },
  app
).listen(PORT, () => {
  console.log(`express listen on https://localhost:${PORT}`);
});
