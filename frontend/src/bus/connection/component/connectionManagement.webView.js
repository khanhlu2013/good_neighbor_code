import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LoadingIcon from "../../../share/loadingIcon.js";
import { AppCenterWrapMixin } from "../../../share/style/appCenterWrap_style.js";
import TabPanel from "../../../share/style/tabPanel_style.js";
import SearchByEmail from "./searchByEmail.js";
import ConnectionFriendTable from "./connectionTable_friend.js";
import ConnectionOutTable from "./connectionTable_out.js";
import ConnectionDenyTable from "./connectionTable_deny.js";
import ConnectionTabEnum from "./connection_tabEnum.js";
import ConnectionTabBar from "./connection_tabBar.js";
import ConnectionInTable from "./connectionTable_in.js";
import User from "@gn/common/model/user";
import BusinessBannerStyle from "../../../share/style/bannerStyle/businessBanner.style";
import ConnectionFilter from "@gn/common/bus/connection/connection.filter";

const Style = styled.div`
  ${AppCenterWrapMixin};
  margin-top: 10px;
`;

class ConnectionManagementWebView extends Component {
  static propTypes = {
    loginUser: PropTypes.instanceOf(User).isRequired,
    isFetchingConnections: PropTypes.bool.isRequired,
    isInitConnections: PropTypes.bool.isRequired,
    connections: PropTypes.array.isRequired,
    isCreatingConnection: PropTypes.bool.isRequired,
    onCreateConnection: PropTypes.func.isRequired,
    updatingConnectionIds: PropTypes.array.isRequired,
    onUpdateConnection: PropTypes.func.isRequired
  };

  state = {
    selectTab: ConnectionTabEnum.FRIEND
  };

  static countFriendRequest(connections, loginUserId) {
    if (connections === null) {
      return null;
    }
    return connections.filter(
      connection =>
        connection.to.id === loginUserId &&
        connection.isApproveByFrom &&
        connection.isApproveByTo === undefined
    ).length;
  }

  onTabChange = selectTab => {
    this.setState({ selectTab });
  };

  _getConnectionContent = connections => {
    let loginUserId = this.props.loginUser.id;
    let { selectTab } = this.state;
    const { updatingConnectionIds, isCreatingConnection } = this.props;

    const friends = ConnectionFilter.friend(connections, loginUserId);
    const inConnections = ConnectionFilter.in(connections, loginUserId);
    const outConnections = ConnectionFilter.out(connections, loginUserId);
    const denyConnections = ConnectionFilter.deny(connections, loginUserId);

    return (
      <Fragment>
        <BusinessBannerStyle>
          <ConnectionTabBar
            selectTab={selectTab}
            onTabChange={this.onTabChange}
            friendConnectionCount={friends.length}
            inConnectionCount={inConnections.length}
            outConnectionCount={outConnections.length}
            denyConnectionCount={denyConnections.length}
          />
        </BusinessBannerStyle>

        <Style>
          <TabPanel show={selectTab === ConnectionTabEnum.FRIEND}>
            <ConnectionFriendTable
              connections={friends}
              updatingConnectionIds={updatingConnectionIds}
              loginUserId={loginUserId}
              onUpdateConnectionClick={this.props.onUpdateConnection}
            />
          </TabPanel>
          <TabPanel show={selectTab === ConnectionTabEnum.IN_CONNECTION}>
            <ConnectionInTable
              connections={inConnections}
              updatingConnectionIds={updatingConnectionIds}
              loginUserId={loginUserId}
              onUpdateConnectionClick={this.props.onUpdateConnection}
            />
          </TabPanel>
          <TabPanel show={selectTab === ConnectionTabEnum.OUT_CONNECTION}>
            <ConnectionOutTable
              connections={outConnections}
              updatingConnectionIds={updatingConnectionIds}
              loginUserId={loginUserId}
              onUpdateConnectionClick={this.props.onUpdateConnection}
            />
          </TabPanel>
          <TabPanel show={selectTab === ConnectionTabEnum.DENY}>
            <ConnectionDenyTable
              connections={denyConnections}
              updatingConnectionIds={updatingConnectionIds}
              loginUserId={loginUserId}
              onUpdateConnectionClick={this.props.onUpdateConnection}
            />
          </TabPanel>
          <TabPanel show={selectTab === ConnectionTabEnum.SEARCH}>
            <SearchByEmail
              loginUser={this.props.loginUser}
              connections={connections}
              onCreateConnectionClick={this.props.onCreateConnection}
              isCreatingConnection={isCreatingConnection}
            />
          </TabPanel>
        </Style>
      </Fragment>
    );
  };

  render() {
    let { connections, isInitConnections, isFetchingConnections } = this.props;

    return (
      <div id="ConnectionManagement-react">
        {isInitConnections && this._getConnectionContent(connections)}
        {isFetchingConnections && (
          <h1 className="text-center">
            <LoadingIcon text="loading" />
          </h1>
        )}
      </div>
    );
  }
}

export default ConnectionManagementWebView;
