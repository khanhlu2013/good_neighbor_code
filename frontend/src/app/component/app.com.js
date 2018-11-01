import React, { Component } from "react";
import PropTypes from "prop-types";

import PrivateAppContainer from "../container/appPrivate.con";
import { AppCenterWrapStyle } from "../../componentUi/style/appCenterWrap_style";
import { User } from "../../model/user";
import BackdoorLoginContainer from "../container/backdoorLogin.con";
import AppHeaderContainer from "../container/appHeader.con";
import PublicAppComponent from "./appPublic.com";

class AppComponent extends Component {
  static propTypes = {
    loginUser: PropTypes.instanceOf(User),
    authCheck: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.authCheck();
  }

  render() {
    const { loginUser } = this.props;

    let appContent;
    if (loginUser === undefined) {
      appContent = null;
    } else if (loginUser === null) {
      appContent = (
        <AppCenterWrapStyle>
          <PublicAppComponent />
        </AppCenterWrapStyle>
      );
    } else {
      appContent = <PrivateAppContainer />;
    }
    return (
      <div id="app-react">
        <AppHeaderContainer />
        {loginUser === null && (
          <AppCenterWrapStyle>
            <BackdoorLoginContainer />
          </AppCenterWrapStyle>
        )}
        {appContent}
      </div>
    );
  }
}

export default AppComponent;
