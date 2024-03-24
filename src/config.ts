export const CONFIG = (function () {
  if (!process.env.CLIENT_ID) {
    throw new Error("CLIENT_ID env varriable need to be set.");
  }
  if (!process.env.CLIENT_SECRET) {
    throw new Error("CLIENT_SECRET env varriable need to be set.");
  }
  if (!process.env.COOKIE_KEY_1) {
    throw new Error("COOKIE_KEY_1 env varriable need to be set.");
  }
  if (!process.env.COOKIE_KEY_2) {
    throw new Error("COOKIE_KEY_2 env varriable need to be set.");
  }

  return {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
  };
})();
