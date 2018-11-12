import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import InPostUserHistoryList from "./inPost_userHistoryList";
import InPostList from "./inPostList";
import InPostTabBar from "./inPost_tabBar";
import InPostTabEnum from "./inPost_tabEnum";
import LoadingIcon from "../../../share/loadingIcon";
import AppBodyBannerStyle from "../../../share/style/appBodyBanner_style";
import TabPanel from "../../../share/style/tabPanel_style";
import AppCenterWrapStyle from "../../../share/style/appCenterWrap_style";
import PostUserHistoryListStyle from "../../post/component/style/postUser_historyList_style";

class InPostManagementComponent extends Component {
  static propTypes = {
    loginUser: PropTypes.object.isRequired,
    //init data
    fetchInPosts: PropTypes.func.isRequired,
    //data
    posts: PropTypes.array.isRequired,
    isFetchingPosts: PropTypes.bool.isRequired,
    isInitPosts: PropTypes.bool.isRequired,
    approveAlertPosts: PropTypes.array.isRequired,
    returnShares: PropTypes.array.isRequired
  };

  state = {
    selectTab: InPostTabEnum.ALL
  };

  componentDidMount() {
    this.props.fetchInPosts();
  }

  onTabChange = selectTab => {
    this.setState({ selectTab });
  };

  _getPostsContent(posts) {
    const { selectTab } = this.state;

    const requestPosts = posts.filter(post =>
      post.requestShares.some(
        share => share.borrower.id === this.props.loginUser.id
      )
    );
    const borrowPosts = posts.filter(
      post =>
        post.curBorrowShare &&
        post.curBorrowShare.borrower.id === this.props.loginUser.id
    );

    const generateList = (listId, postArray) => (
      <InPostList
        listId={listId}
        loginUser={this.props.loginUser}
        posts={postArray}
      />
    );

    return (
      <Fragment>
        <AppBodyBannerStyle>
          <InPostTabBar
            selectTab={selectTab}
            onTabChange={this.onTabChange}
            allCount={posts.length}
            requestCount={requestPosts.length}
            approveCount={this.props.approveAlertPosts.length}
            borrowCount={borrowPosts.length}
            historyCount={this.props.returnShares.length}
          />
        </AppBodyBannerStyle>

        <AppCenterWrapStyle>
          <TabPanel show={selectTab === InPostTabEnum.ALL}>
            {generateList("inPostList-all-react", posts)}
          </TabPanel>
          <TabPanel show={selectTab === InPostTabEnum.REQUEST}>
            {generateList("inPostList-request-react", requestPosts)}
          </TabPanel>
          <TabPanel show={selectTab === InPostTabEnum.APPROVE}>
            {generateList(
              "inPostList-approveNote-react",
              this.props.approveAlertPosts
            )}
          </TabPanel>
          <TabPanel show={selectTab === InPostTabEnum.BORROW}>
            {generateList("inPostList-borrow-react", borrowPosts)}
          </TabPanel>
          <TabPanel show={selectTab === InPostTabEnum.HISTORY}>
            <PostUserHistoryListStyle>
              <InPostUserHistoryList shares={this.props.returnShares} />
            </PostUserHistoryListStyle>
          </TabPanel>
        </AppCenterWrapStyle>
      </Fragment>
    );
  }

  render() {
    const { posts, isInitPosts, isFetchingPosts } = this.props;

    return (
      <div id="inPostManagement-react">
        {isFetchingPosts && (
          <h1 className="text-center">
            <LoadingIcon text="loading" />
          </h1>
        )}
        {isInitPosts && this._getPostsContent(posts)}
      </div>
    );
  }
}

export default InPostManagementComponent;
