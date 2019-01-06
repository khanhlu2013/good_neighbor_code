import React, { Component } from "react";
import PropTypes from "prop-types";

import PrivateAppNavigator from "../navigation/privateApp/privateApp.navigation";

class PrivateAppMobileView extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    inPostsAlertCount: PropTypes.number.isRequired,
    outPostsAlertCount: PropTypes.number.isRequired,
    connectionAlertCount: PropTypes.number.isRequired
  };

  render() {
    const {
      navigation,
      inPostsAlertCount,
      outPostsAlertCount,
      connectionAlertCount
    } = this.props;
    return (
      <PrivateAppNavigator
        navigation={navigation}
        screenProps={{
          inPostsAlertCount,
          outPostsAlertCount,
          connectionAlertCount
        }}
      />
    );
  }
}

export default PrivateAppMobileView;
