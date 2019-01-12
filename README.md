# good-neighboors

A social networking app to help friends share stuffs

testing site: https://khanhlu2013.github.io/good_neighbor_test/

Back end is an NodeJS API to serve data from Mongo and handle authentication. Front end is static ReactJs page that can be host separately from the backend.

---

Configuration for backend local development

Create a git ignore file at backend/configs/keys-local-for-dev.js with the content below

module.exports = {
SESSION_SECRET: "my_local_session_secrete",
FRONTEND_URL: "my_frontend_url" // e.g. "http://localhost:3002",
PORT: "back_end_port" // e.g. 3001
MONGODB_URI: "my_mongo_db_uri" // e.g. "mongodb://localhost:27017/my_db_name",
GOOGLE_CLIENT_ID: "my_google_client_id",
GOOGLE_CLIENT_SECRET: "my_google_client_secrete",
GOOGLE_REDIRECT_URL: "my_google_redirect_url"
};

---

Configuration for backend production server on heroku

Setup the env var on heroku with the key listed above for local dev. Exception: heroku will set the PORT for you automatically, so that you don't have to set this on heroku config var production server.

---

Configuration for web/mobile (frontend) development and production

The file /common/config/backend_url.js contain the setup for local/development. In my case, it is hardcode as below

const BACKEND_URL_CONFIG = {
local: {
BASE_URL: "http://localhost",
PORT: "3001"
},
production: {
BASE_URL: "https://goodneighbor-backend-test.herokuapp.com",
PORT: ""
}
};
export default BACKEND_URL_CONFIG;

Edit this file to fit with your setup for local and production env.
