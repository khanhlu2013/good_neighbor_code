import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import InPostUserHistoryList from "./inPost_userHistoryList";
import InPostTabBar from "./inPost_tabBar";
import InPostTabEnum from "./inPost_tabEnum";
import LoadingIcon from "../../../share/loadingIcon";
import AppBodyBannerStyle from "../../../share/style/appBodyBanner_style";
import TabPanel from "../../../share/style/tabPanel_style";
import AppCenterWrapStyle from "../../../share/style/appCenterWrap_style";
import PostUserHistoryListStyle from "../../post/style/postUser_historyList_style";
import InPostListWebView from "../view/inPostList.webView";

class InPostManagementComponent extends Component {
  static propTypes = {
    //init data
    fetchInPosts: PropTypes.func.isRequired,
    //raw
    posts: PropTypes.array.isRequired,
    isFetchingPosts: PropTypes.bool.isRequired,
    isInitPosts: PropTypes.bool.isRequired,
    //calculated
    requestPosts: PropTypes.array.isRequired,
    borrowPosts: PropTypes.array.isRequired,
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

  _getPostsContent() {
    const { selectTab } = this.state;
    const {
      posts,
      requestPosts,
      approveAlertPosts,
      borrowPosts,
      returnShares
    } = this.props;

    return (
      <Fragment>
        <AppBodyBannerStyle>
          <InPostTabBar
            selectTab={selectTab}
            onTabChange={this.onTabChange}
            allCount={posts.length}
            requestCount={requestPosts.length}
            approveCount={approveAlertPosts.length}
            borrowCount={borrowPosts.length}
            historyCount={returnShares.length}
          />
        </AppBodyBannerStyle>

        <AppCenterWrapStyle>
          <TabPanel show={selectTab === InPostTabEnum.ALL}>
            <InPostListWebView listId={"inPostList-all-react"} posts={posts} />
          </TabPanel>
          <TabPanel show={selectTab === InPostTabEnum.REQUEST}>
            <InPostListWebView
              listId={"inPostList-request-react"}
              posts={requestPosts}
            />
          </TabPanel>
          <TabPanel show={selectTab === InPostTabEnum.APPROVE}>
            <InPostListWebView
              listId={"inPostList-approveNote-react"}
              posts={approveAlertPosts}
            />
          </TabPanel>
          <TabPanel show={selectTab === InPostTabEnum.BORROW}>
            <InPostListWebView
              listId={"inPostList-borrow-react"}
              posts={borrowPosts}
            />
          </TabPanel>
          <TabPanel show={selectTab === InPostTabEnum.HISTORY}>
            <PostUserHistoryListStyle>
              <InPostUserHistoryList shares={returnShares} />
            </PostUserHistoryListStyle>
          </TabPanel>
        </AppCenterWrapStyle>
      </Fragment>
    );
  }

  render() {
    const { isInitPosts, isFetchingPosts } = this.props;

    return (
      <div id="inPostManagement-react">
        {isFetchingPosts && (
          <h1 className="text-center">
            <LoadingIcon text="loading" />
          </h1>
        )}
        {isInitPosts && this._getPostsContent()}
      </div>
    );
  }
}

export default InPostManagementComponent;
