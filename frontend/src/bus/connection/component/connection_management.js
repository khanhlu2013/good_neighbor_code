import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LoadingIcon from "../../../share/loadingIcon.js";
import AppBodyBannerStyle from "../../../share/style/appBodyBanner_style.js";
import { AppCenterWrapMixin } from "../../../share/style/appCenterWrap_style.js";
import TabPanel from "../../../share/style/tabPanel_style.js";
import SearchByEmail from "./searchByEmail.js";
import ConnectionFriendTable from "./connectionTable_friend.js";
import ConnectionOutTable from "./connectionTable_out.js";
import ConnectionDenyTable from "./connectionTable_deny.js";
import ConnectionTabEnum from "./connection_tabEnum.js";
import ConnectionTabBar from "./connection_tabBar.js";
import ConnectionInTable from "./connectionTable_in.js";
import User from "../../../model/user.js";

const Style = styled.div`
  ${AppCenterWrapMixin};
  margin-top: 10px;
`;

class ConnectionManagementComponent extends Component {
  static propTypes = {
    loginUser: PropTypes.instanceOf(User).isRequired,
    fetchConnections: PropTypes.func.isRequired,
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

  componentDidMount() {
    this.props.fetchConnections();
  }

  onTabChange = selectTab => {
    this.setState({ selectTab });
  };

  _getConnectionContent = connections => {
    let loginUserId = this.props.loginUser.id;
    let { selectTab } = this.state;
    const { updatingConnectionIds, isCreatingConnection } = this.props;

    const friends = connections.filter(
      connection => connection.isApproveByFrom && connection.isApproveByTo
    );
    const inFriends = connections.filter(
      connection =>
        connection.to.id === loginUserId &&
        connection.isApproveByFrom &&
        connection.isApproveByTo === undefined
    );
    const outFriends = connections.filter(
      connection =>
        connection.from.id === loginUserId &&
        connection.isApproveByFrom &&
        connection.isApproveByTo === undefined
    );
    const rejectedFriends = connections.filter(
      connection =>
        (connection.to.id === loginUserId &&
          connection.isApproveByTo === false) ||
        (connection.from.id === loginUserId &&
          connection.isApproveByFrom === false)
    );

    return (
      <Fragment>
        <AppBodyBannerStyle>
          <ConnectionTabBar
            selectTab={selectTab}
            onTabChange={this.onTabChange}
          />
        </AppBodyBannerStyle>

        <Style>
          <TabPanel show={selectTab === ConnectionTabEnum.FRIEND}>
            <ConnectionFriendTable
              connections={friends}
              updatingConnectionIds={updatingConnectionIds}
              loginUserId={loginUserId}
              onUpdateConnectionClick={this.props.onUpdateConnection}
            />
          </TabPanel>
          <TabPanel show={selectTab === ConnectionTabEnum.FRIENDREQUEST}>
            <ConnectionInTable
              connections={inFriends}
              updatingConnectionIds={updatingConnectionIds}
              loginUserId={loginUserId}
              onUpdateConnectionClick={this.props.onUpdateConnection}
            />
          </TabPanel>
          <TabPanel show={selectTab === ConnectionTabEnum.MYREQUEST}>
            <ConnectionOutTable
              connections={outFriends}
              updatingConnectionIds={updatingConnectionIds}
              loginUserId={loginUserId}
              onUpdateConnectionClick={this.props.onUpdateConnection}
            />
          </TabPanel>
          <TabPanel show={selectTab === ConnectionTabEnum.DENY}>
            <ConnectionDenyTable
              connections={rejectedFriends}
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
    let { connections, isInitConnections } = this.props;
    let content;

    if (isInitConnections) {
      content = this._getConnectionContent(connections);
    } else {
      content = (
        <h1 className="text-center">
          <LoadingIcon text="loading" />
        </h1>
      );
    }

    return <div id="ConnectionManagement-react">{content}</div>;
  }
}

export default ConnectionManagementComponent;
