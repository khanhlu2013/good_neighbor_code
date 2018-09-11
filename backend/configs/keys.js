const mode = process.env.NODE_ENV || "development"; //mode default = development

if (!["production", "development", "test"].includes(mode)) {
  throw Error(`Unexpected mode ${mode}`);
}

if (mode !== "production") {
  //setting up process.env for development or test.
  const keyValues = require("./keys-local-for-test-and-dev")[mode];
  Object.assign(process.env, keyValues);
} else {
  //production env need to be manaully set on production server
}

// ------------------------------------------------------------------------------------------------
// at this stage, i dont care what NODE_ENV is. process.env is already configed for backend to work
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

const keys = {
  SESSION_SECRET: process.env.SESSION_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL, //for auth redirect purpose
  BACKEND_PORT: process.env.BACKEND_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL,

  NODE_ENV: mode
};
Object.entries(keys).forEach(([key, value]) => {
  if (value === undefined) {
    throw Error(`Environment variable '${key}' is not set.`);
  }
});
module.exports = keys;
