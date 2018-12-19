import React, { Component, Fragment } from "react";

import InPostTabBar from "../component/inPost_tabBar";
import InPostTabEnum from "../component/inPost_tabEnum";
import LoadingIcon from "../../../share/loadingIcon";
import TabPanel from "../../../share/style/tabPanel_style";
import AppCenterWrapStyle from "../../../share/style/appCenterWrap_style";
import PostUserHistoryListStyle from "../../post/style/postUser_historyList_style";
import InPostListWebView from "./inPostList.webView";
import InPostUserHistoryListWebView from "./inPost_userHistoryList.webView";
import BusinessBannerStyle from "../../../share/style/bannerStyle/businessBanner.style";
import InPostUserHistoryListController from "@gn/common/bus/inPost/controller/inPost_userHistoryList.controller";
import InPostManagementPropType from "@gn/common/bus/inPost/propType/inPostManagement.propType";

class InPostManagementWebView extends Component {
  static propTypes = InPostManagementPropType;

  state = {
    selectTab: InPostTabEnum.ALL
  };

  onTabChange = selectTab => {
    this.setState({ selectTab });
  };

  _getPostsContent() {
    const { selectTab } = this.state;
    const {
      posts,
      requestPosts,
      borrowPosts,
      approveAlertPosts,
      returnShares
    } = this.props;

    return (
      <Fragment>
        <BusinessBannerStyle>
          <InPostTabBar
            selectTab={selectTab}
            onTabChange={this.onTabChange}
            allCount={posts.length}
            requestCount={requestPosts.length}
            approveCount={approveAlertPosts.length}
            borrowCount={borrowPosts.length}
            historyCount={returnShares.length}
          />
        </BusinessBannerStyle>

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
              <InPostUserHistoryListController
                shares={returnShares}
                view={InPostUserHistoryListWebView}
              />
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

export default InPostManagementWebView;
