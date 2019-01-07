import React from "react";

import PropTypes from "prop-types";

import LoadingIcon from "../../../share/loadingIcon.js";
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
    searchResultResponseMessage,

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
          placeholder="by email"
          value={email}
          onChange={e => onSearchChange(e.target.value)}
        />
        {isSearching ? (
          <LoadingIcon text="searching" />
        ) : (
          <input className="btn btn-primary" type="submit" value="search" />
        )}
      </form>
      {searchResultResponseMessage && (
        <p className="lead">{searchResultResponseMessage}</p>
      )}

      {searchedUser && (
        <CrudConnectionControlPanel
          loginUser={loginUser}
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

function CrudConnectionControlPanel(props) {
  const {
    loginUser,
    searchedUser,
    searchedConnection,
    isCreatingConnection,
    onCreateConnection
  } = props;

  const _onCreateConnectionClick = evt => {
    onCreateConnection(searchedUser.id);
  };

  let message = "";
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
          onClick={_onCreateConnectionClick}
        >
          Invite {searchedUser.name}
        </button>
      );
    }
  } else {
    /*you and searchedUser have exchanged invitation*/
    if (
      /*you init the connection*/
      searchedConnection.from.id === loginUser.id
    ) {
      message = `You invited ${searchedUser.name}. `;
      if (
        /*but you changed your mind*/
        searchedConnection.isApproveByFrom === false
      ) {
        message += `But you changed your mind.`;
      } else {
        /*and you havent changed your mind yet*/
        if (
          /*searchedUser haven't responsed you*/
          searchedConnection.isApproveByTo === undefined
        ) {
          message += `Please wait for approval!`;
        } else if (
          /*searchedUser approved you*/
          searchedConnection.isApproveByTo === true
        ) {
          message += `And you are friends!`;
        } else {
          /*searchedUser denided you*/
          message += `But sorry, you got denied!`;
        }
      }
    } else {
      /*searchedUser init the connection*/
      message = `${searchedUser.name} invited you. `;
      if (
        /*but searchedUser changed her mind*/
        searchedConnection.isApproveByFrom === false
      ) {
        message += `But changed his/her mind. Sorry!`;
      } else {
        /*and searchedUser havent changed her mind yet*/
        if (
          /*you havent responsed searchedUser*/
          searchedConnection.isApproveByTo === undefined
        ) {
          message += `Please response.`;
        } else if (
          /*you approved searchedUser*/
          searchedConnection.isApproveByTo === true
        ) {
          message += `And you accpected!`;
        } else {
          /*you denied searchedUser*/
          message += `And you denied.`;
        }
      }
    }
  }

  return (
    <div id="CrudConnectionControlPanel-react">
      {message}
      {action}
    </div>
  );
}

CrudConnectionControlPanel.propTypes = {
  loginUser: PropTypes.object.isRequired,
  searchedUser: PropTypes.object.isRequired,
  searchedConnection: PropTypes.object, //if null we can create connection
  isCreatingConnection: PropTypes.bool.isRequired,
  onCreateConnection: PropTypes.func.isRequired
};

export default SearchByEmailWebView;
