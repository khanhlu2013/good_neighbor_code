import React from "react";
import styled from "styled-components";

import LoadingIcon from "../../../share/loadingIcon";
import AppCenterWrapStyle from "../../../share/style/appCenterWrap_style";
import ProfileImage from "../../../share/profileImage";
import ProfileManagementPropType from "@gn/common/bus/profile/propType/profileManagement.propType";
import ShadowBoxMixin from "@gn/common/style/shadowBox.mixin";

const Style = styled.div`
  ${ShadowBoxMixin} margin-top:10px;
  padding: 10px;
  text-align: center;
`;

function ProfileManagementWebView(props) {
  const { isLoggingOut, loginUser, onLogOut } = props;

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
              onClick={onLogOut}
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

ProfileManagementWebView.propTypes = ProfileManagementPropType;

export default ProfileManagementWebView;
