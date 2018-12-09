import { connect } from "react-redux";
import BackdoorLoginController from "../../common/app/controller/backdoorLogin.controller";

const BackdoorLoginConnect = connect()(BackdoorLoginController); //i need the dispatch function
export default BackdoorLoginConnect;
