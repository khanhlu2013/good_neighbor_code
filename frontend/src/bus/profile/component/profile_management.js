import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import User from "@gn/common/model/user";
import LoadingIcon from "../../../share/loadingIcon";
import AppCenterWrapStyle from "../../../share/style/appCenterWrap_style";
import ProfileImage from "../../../share/profileImage";
import ShadowBoxMixin from "@gn/common/style/shadowBox.mixin";

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

export default ProfileManagementComponent;
