import React from "react";
import SearchByEmailMobileView from "../view/searchByEmail.mobileView";
import SearchByEmailController from "@gn/common/bus/connection/controller/searchByEmail.controller";

function SearchByEmailScreen(props) {
  const {
    loginUser,
    connections,
    isCreatingConnection,
    onCreateConnection
  } = props.screenProps;

  return (
    <SearchByEmailController
      loginUser={loginUser}
      connections={connections}
      isCreatingConnection={isCreatingConnection}
      onCreateConnection={onCreateConnection}
      view={SearchByEmailMobileView}
    />
  );
}

export default SearchByEmailScreen;
