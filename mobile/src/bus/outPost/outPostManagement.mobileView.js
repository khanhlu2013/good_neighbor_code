import React, { Component } from "react";
import { View, Text } from "react-native";

import OutPostManagementPropType from "./propType/outPostManagement.propType";

class OutPostManagementMobileView extends Component {
  static propTypes = OutPostManagementPropType;

  state = {
    //crud
    postIdForDialogToCreateOrUpdate: null,
    isCrudingPost: false,

    //decide
    curDecidePostId: null
  };

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    );
  }
}

export default OutPostManagementMobileView;
