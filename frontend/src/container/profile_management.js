import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { User } from "../model/user";
import { LoadingIcon } from "../componentUi/loadingIcon";
import { ProfileImage } from "../componentUi/profileImage";
import { AppCenterWrapStyle } from "../componentUi/style/appCenterWrap_style";
import { ShadowBoxMixin } from "../componentUi/style/shadowBox_style";
import { logOut } from "../action/auth_action";

const Style = styled.div`
  ${ShadowBoxMixin} margin-top:10px;
  padding: 10px;
  text-align: center;
`;

function ProfileManagementComponent(props) {
  const { isLoggingOut, loginUser, onLogOutClick } = props;

  return (
    <AppCenterWrapStyle>
      <Style>
        <div>
          <ProfileImage loginUser={loginUser} />
          <span className="ml-2">{loginUser.getNameAndEmail()}</span>
        </div>

        <div className="mt-3">
          {isLoggingOut ? (
            <LoadingIcon text="logout" />
          ) : (
            <button
              id="appLogOutBtn-react"
              onClick={onLogOutClick}
              className="btn btn-warning"
            >
              logout
            </button>
          )}
        </div>
      </Style>
    </AppCenterWrapStyle>
  );
}

ProfileManagementComponent.propTypes = {
  isLoggingOut: PropTypes.bool.isRequired,
  loginUser: PropTypes.instanceOf(User).isRequired,
  onLogOutClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  isLoggingOut: state.isLoggingOut,
  loginUser: state.loginUser.value
});
const mapDispatchToProp = (dispatch, ownProps) => ({
  onLogOutClick: () => dispatch(logOut())
});

const ProfileManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProp
)(ProfileManagementComponent);

export default ProfileManagementContainer;
