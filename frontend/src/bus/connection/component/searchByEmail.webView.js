import React from "react";

import LoadingIcon from "../../../share/loadingIcon.js";
import SearchByEmailResultDisplayPropType from "@gn/common/bus/connection/propType/searchByEmailResultDisplay.propType";
import SearchByEmailPropType from "@gn/common/bus/connection/propType/searchByEmail.propType";

function SearchByEmailWebView(props) {
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
    responseMessageAboutSearchConnectionResult,

    //handler
    onSearchChange,
    onSearchSubmit
  } = props;

  return (
    <div id="SearchByEmail-react" className="text-center">
      <form
        onSubmit={e => {
          onSearchSubmit();
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="search email"
          value={email}
          onChange={e => onSearchChange(e.target.value)}
        />
        {isSearching ? (
          <LoadingIcon text="searching" />
        ) : (
          <input className="btn btn-primary" type="submit" value="search" />
        )}
      </form>
      {responseMessageAboutSearchInput && (
        <p className="lead">{responseMessageAboutSearchInput}</p>
      )}

      {searchedUser && (
        <SearchByEmailResultDisplayWebView
          loginUser={loginUser}
          responseMessageAboutSearchConnectionResult={
            responseMessageAboutSearchConnectionResult
          }
          searchedUser={searchedUser}
          searchedConnection={searchedConnection}
          isCreatingConnection={isCreatingConnection}
          onCreateConnection={onCreateConnection}
        />
      )}
    </div>
  );
}
SearchByEmailWebView.propTypes = SearchByEmailPropType;

function SearchByEmailResultDisplayWebView(props) {
  const {
    responseMessageAboutSearchConnectionResult,
    searchedUser,
    searchedConnection,
    isCreatingConnection,
    onCreateConnection
  } = props;

  let action = null;
  if (
    /*you and searchedUser haven't exchanged invitation yet*/
    searchedConnection === null
  ) {
    if (isCreatingConnection) {
      action = <LoadingIcon text={`Inviting ${searchedUser.name}`} />;
    } else {
      action = (
        <button
          className="btn btn-success"
          id="createConnectionBtn"
          onClick={() => {
            onCreateConnection(searchedUser.id);
          }}
        >
          Invite {searchedUser.name}
        </button>
      );
    }
  }

  return (
    <div id="CrudConnectionControlPanel-react">
      {responseMessageAboutSearchConnectionResult}
      {action}
    </div>
  );
}

SearchByEmailResultDisplayWebView.propTypes = SearchByEmailResultDisplayPropType;

export default SearchByEmailWebView;
