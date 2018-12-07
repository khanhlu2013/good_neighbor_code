const mode = process.env.NODE_ENV; //mode default = development

//verify mode is setup correctly either on local or production
if (!["production", "development"].includes(mode)) {
  throw Error(`Unexpected mode ${mode}`);
}

if (mode !== "production") {
  const keyValues = require("./keys-local-for-dev");
  Object.assign(process.env, keyValues);
} else {
  //production env need to be manaully set on production server
}

// ------------------------------------------------------------------------------------------------
// at this stage, either evn is production or local, process.env is fully configed for the backend
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

const keys = {
  SESSION_SECRET: process.env.SESSION_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL, //for auth redirect purpose
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL,
  NODE_ENV: mode
};

//verify that either production or development env is setup correctly
Object.entries(keys).forEach(([key, value]) => {
  if (value === undefined) {
    throw Error(`Environment variable '${key}' is not set.`);
  }
});
module.exports = keys;
