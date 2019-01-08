import React, { Fragment } from "react";
import { View } from "react-native";
import { Button, Text, Input, Form, Item, Label, Icon } from "native-base";

import LoadingIconMobileView from "../../../share/LoadingIcon.mobileView";
import SearchByEmailResultDisplayPropType from "@gn/common/bus/connection/propType/searchByEmailResultDisplay.propType";
import SearchByEmailPropType from "@gn/common/bus/connection/propType/searchByEmail.propType";

function SearchByEmailMobileView(props) {
  const {
    //controller props
    loginUser,
    isCreatingConnection,
    onCreateConnection,

    //controller state
    email,
    searchedUser,
    isSearching,

    //derived state
    searchedConnection,
    responseMessageAboutSearchInput,
    responseMessageAboutSearchResult,

    //handler
    onSearchChange,
    onSearchSubmit
  } = props;

  return (
    <Fragment>
      <Form>
        <Item>
          <Icon active name="search" />
          <Input
            autoCapitalize="none"
            placeholder="search email"
            value={email}
            onChangeText={onSearchChange}
          />
        </Item>
      </Form>
      <View style={{ alignItems: "center" }}>
        {isSearching ? (
          <LoadingIconMobileView text="searching" />
        ) : (
          <Button full onPress={onSearchSubmit}>
            <Text>search</Text>
          </Button>
        )}
        {responseMessageAboutSearchInput && (
          <Text>{responseMessageAboutSearchInput}</Text>
        )}
      </View>

      {/* {searchedUser && (
        <SearchByEmailResultDisplayWebView
          loginUser={loginUser}
          responseMessageAboutSearchResult={responseMessageAboutSearchResult}
          searchedUser={searchedUser}
          searchedConnection={searchedConnection}
          isCreatingConnection={isCreatingConnection}
          onCreateConnection={onCreateConnection}
        />
      )} */}
    </Fragment>
  );
}
SearchByEmailMobileView.propTypes = SearchByEmailPropType;

// function SearchByEmailResultDisplayWebView(props) {
//   const {
//     responseMessageAboutSearchResult,
//     searchedUser,
//     searchedConnection,
//     isCreatingConnection,
//     onCreateConnection
//   } = props;

//   let action = null;

//   if (
//     /*you and searchedUser haven't exchanged invitation yet*/
//     searchedConnection === null
//   ) {
//     if (isCreatingConnection) {
//       action = <LoadingIconMobileView text={`Inviting ${searchedUser.name}`} />;
//     } else {
//       action = (
//         <button
//           className="btn btn-success"
//           id="createConnectionBtn"
//           onClick={() => {
//             onCreateConnection(searchedUser.id);
//           }}
//         >
//           Invite {searchedUser.name}
//         </button>
//       );
//     }
//   }

//   return (
//     <div id="CrudConnectionControlPanel-react">
//       {responseMessageAboutSearchResult}
//       {action}
//     </div>
//   );
// }

// SearchByEmailResultDisplayWebView.propTypes = SearchByEmailResultDisplayPropType;

export default SearchByEmailMobileView;
