import React from "react";
import PropTypes from "prop-types";
import "./appHeaderNav.css";
function AppHeaderNav(props) {
  const { onInPostNav, onOutPostNav, onConnectionNav } = props;

  const onInPostClicked = e => {
    onInPostNav();
  };

  const onOutPostClicked = e => {
    onOutPostNav();
  };

  const onConnectionClicked = e => {
    onConnectionNav();
  };
  return (
    <div className="app-header-nav">
      <button className="app-header-nav-item" onClick={onInPostClicked}>
        in post
      </button>
      <button className="app-header-nav-item" onClick={onOutPostClicked}>
        out post
      </button>
      <button className="app-header-nav-item" onClick={onConnectionClicked}>
        connection
      </button>
    </div>
  );
}

AppHeaderNav.propTypes = {
  onInPostNav: PropTypes.func.isRequired,
  onOutPostNav: PropTypes.func.isRequired,
  onConnectionNav: PropTypes.func.isRequired
};

export { AppHeaderNav };
