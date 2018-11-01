import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { SearchByEmail } from "./searchByEmail.js";
import { ConnectionFriendTable } from "./connectionTable_friend.js";
import { ConnectionOutTable } from "./connectionTable_out.js";
import { ConnectionDenyTable } from "./connectionTable_deny.js";
import { ConnectionInTable } from "./connectionTable_in.js";
import { API } from "../../api/profile-api.js";
import { ConnectionTabEnum } from "./connection_tabEnum.js";
import { ConnectionTabBar } from "./connection_tabBar.js";
import LoadingIcon from "../../share/loadingIcon.js";
import AppBodyBannerStyle from "../../share/style/appBodyBanner_style.js";
import { AppCenterWrapMixin } from "../../share/style/appCenterWrap_style.js";
import TabPanel from "../../share/style/tabPanel_style.js";

const Style = styled.div`
  ${AppCenterWrapMixin};
  margin-top: 10px;
`;

class ConnectionManagement extends Component {
  state = {
    connections: null,
    isCreatingConnection: false,
    updatingConnectionIds: [],
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

  async componentDidMount() {
    const connections = await API.connections();
    this.setConnectionsAndNotifyRequestCount(connections);
  }

  setConnectionsAndNotifyRequestCount(connections) {
    this.setState({ connections });
  }

  onCreateConnection = userIdToAdd => {
    this.setState({ isCreatingConnection: true });
    (async () => {
      const newConnection = await API.createConnection(userIdToAdd);
      this.setConnectionsAndNotifyRequestCount([
        ...this.state.connections,
        newConnection
      ]);
      this.setState({ isCreatingConnection: false });
    })();
  };

  onUpdateConnection = (connectionId, isApproved) => {
    this.props.onConnectionNotify(null);
    this.setState({
      updatingConnectionIds: [...this.state.updatingConnectionIds, connectionId]
    });
    (async () => {
      const {
        updatedApprovedByTo,
        updatedApprovedByFrom
      } = await API.updateConnection(connectionId, isApproved);

      const curConnection = this.state.connections.find(
        connection => connection.id === connectionId
      );
      curConnection.isApproveByFrom = updatedApprovedByFrom;
      curConnection.isApproveByTo = updatedApprovedByTo;
      this.setConnectionsAndNotifyRequestCount([
        ...this.state.connections.filter(
          connection => connection.id !== curConnection.id
        ),
        curConnection
      ]);

      this.setState({
        updatingConnectionIds: this.state.updatingConnectionIds.filter(
          id => id !== connectionId
        )
      });
    })();
  };

  onTabChange = selectTab => {
    this.setState({ selectTab });
  };

  _getConnectionContent = connections => {
    let loginUserId = this.props.loginUser.id;
    let { updatingConnectionIds, selectTab } = this.state;

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
              updateConnectionCb={this.onUpdateConnection}
            />
          </TabPanel>
          <TabPanel show={selectTab === ConnectionTabEnum.FRIENDREQUEST}>
            <ConnectionInTable
              connections={inFriends}
              updatingConnectionIds={updatingConnectionIds}
              loginUserId={loginUserId}
              updateConnectionCb={this.onUpdateConnection}
            />
          </TabPanel>
          <TabPanel show={selectTab === ConnectionTabEnum.MYREQUEST}>
            <ConnectionOutTable
              connections={outFriends}
              updatingConnectionIds={updatingConnectionIds}
              loginUserId={loginUserId}
              updateConnectionCb={this.onUpdateConnection}
            />
          </TabPanel>
          <TabPanel show={selectTab === ConnectionTabEnum.DENY}>
            <ConnectionDenyTable
              connections={rejectedFriends}
              updatingConnectionIds={updatingConnectionIds}
              loginUserId={loginUserId}
              updateConnectionCb={this.onUpdateConnection}
            />
          </TabPanel>
          <TabPanel show={selectTab === ConnectionTabEnum.SEARCH}>
            <SearchByEmail
              loginUser={this.props.loginUser}
              connections={connections}
              createConnectionCb={this.onCreateConnection}
              isCreatingConnection={this.state.isCreatingConnection}
            />
          </TabPanel>
        </Style>
      </Fragment>
    );
  };

  render() {
    let { connections } = this.state;
    let content;

    if (connections !== null) {
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

ConnectionManagement.propTypes = {
  loginUser: PropTypes.object.isRequired
};
export default ConnectionManagement;
