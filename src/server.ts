import { createServer } from "node:https";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import express from "express";
import passport from "passport";
import middlewares from "./middlewares.js";
import { checkLoggedIn } from "./auth-utils.js";

const PORT = 3000;

const app = express();

app.use(middlewares());

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
