const BACKEND_URL_CONFIG = {
  local: {
    BASE_URL: "http://localhost",
    //BACKEND_BASE_URL : "http://10.0.2.2"; //this is for android emulator.since adroid emulator has it own localhost or 127.0.0.1 ; 10.0.2.2 is a alias for local host for android emulator for development purpose.
    PORT: "3001"
  },
  production: {
    BASE_URL: "https://goodneighbor-backend-test.herokuapp.com",
    PORT: ""
  }
};
export default BACKEND_URL_CONFIG;
