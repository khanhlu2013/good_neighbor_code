import React, { Component } from "react";
import PropTypes from "prop-types";

import PrivateAppNavigator from "../navigation/privateApp.navigation";

class PrivateAppMobileView extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    inPostsAlertCount: PropTypes.number.isRequired,
    outPostsAlertCount: PropTypes.number.isRequired
  };

  render() {
    const { navigation, inPostsAlertCount, outPostsAlertCount } = this.props;
    return (
      <PrivateAppNavigator
        navigation={navigation}
        screenProps={{ inPostsAlertCount, outPostsAlertCount }}
      />
    );
  }
}

export default PrivateAppMobileView;
