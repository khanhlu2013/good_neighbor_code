import React, { Component, Fragment } from "react";

import LoadingIcon from "../../../share/loadingIcon";
import AppCenterWrapStyle from "../../../share/style/appCenterWrap_style";
import TabPanel from "../../../share/style/tabPanel_style";
import OutPostCrudDialog from "./crudDialog";
import OutPostDecisionDialog from "./decisionDialog";
import OutPostListWebView from "./outPostList.webView";
import OutPostTabBar from "./outPost_tabBar";
import OutPostTabEnum from "./outPost_tabEnum";
import OutPostAllHistoryList from "./outPost_allHistoryList";
import PostUserHistoryListStyle from "../../post/style/postUser_historyList_style";
import BusinessBannerStyle from "../../../share/style/bannerStyle/businessBanner.style";
import OutPostListController from "@gn/common/bus/outPost/controller/outPostList.controller";
import OutPostManagementPropType from "@gn/common/bus/outPost/propType/outPostManagement.propType";

class OutPostManagementWebView extends Component {
  static propTypes = OutPostManagementPropType;

  state = {
    selectTab: OutPostTabEnum.ALL,
    //crud
    isOpenCrudDialog: false,
    postIdForDialogToCreateOrUpdate: null,
    isCrudingPost: false,

    //decide
    isOpenDecisionDialog: false,
    curDecidePostId: null
  };

  onTabChange = selectTab => {
    this.setState({ selectTab });
  };

  onCrudDialogCancel = () => {
    this.setState({ isOpenCrudDialog: false });
  };

  onCrudDialogOk = (postId, title, description, isActive) => {
    this.setState({ isCrudingPost: true });
    this.props
      .onCreateOrUpdatePost(postId, title, description, isActive)
      .then(result =>
        this.setState({
          isOpenCrudDialog: false,
          isCrudingPost: false
        })
      );
  };

  onOpenUpdatePostDialog = postId => {
    this.setState({
      isOpenCrudDialog: true,
      postIdForDialogToCreateOrUpdate: postId
    });
  };

  onOpenCreatePostDialog = () => {
    this.setState({
      isOpenCrudDialog: true,
      postIdForDialogToCreateOrUpdate: null
    });
  };

  onOpenDecidePostDialog = postId => {
    this.setState({
      isOpenDecisionDialog: true,
      curDecidePostId: postId
    });
  };

  onExitDecisionDialog = () => {
    this.setState({ isOpenDecisionDialog: false });
  };

  _genPostList = (listId, posts) => (
    <OutPostListController
      listId={listId}
      posts={posts}
      onOpenUpdatePostDialog={this.onOpenUpdatePostDialog}
      onOpenDecidePostDialog={this.onOpenDecidePostDialog}
      onAwareReturnPostClick={this.props.onAwareReturnPost}
      awaringReturnPostIds={this.props.awaringReturnPostIds}
      view={OutPostListWebView}
    />
  );

  _getPostsContent() {
    const {
      posts,
      requestAlertPosts,
      borrowPosts,
      returnAlertPosts,
      returnShares

      //crud
    } = this.props;
    const { selectTab } = this.state;
    return (
      <Fragment>
        <BusinessBannerStyle>
          <OutPostTabBar
            selectTab={selectTab}
            onTabChange={this.onTabChange}
            onOpenCreatePostDialog={this.onOpenCreatePostDialog}
            allCount={posts.length}
            requestCount={requestAlertPosts.length}
            borrowCount={borrowPosts.length}
            returnCount={returnAlertPosts.length}
            historyCount={returnShares.length}
          />
        </BusinessBannerStyle>

        <AppCenterWrapStyle>
          <TabPanel show={selectTab === OutPostTabEnum.ALL}>
            {this._genPostList("outPostList-all-react", posts)}
          </TabPanel>
          <TabPanel show={selectTab === OutPostTabEnum.REQUEST}>
            {this._genPostList(
              "outPostList-requestNote-react",
              requestAlertPosts
            )}
          </TabPanel>
          <TabPanel show={selectTab === OutPostTabEnum.BORROW}>
            {this._genPostList("outPostList-borrow-react", borrowPosts)}
          </TabPanel>
          <TabPanel show={selectTab === OutPostTabEnum.RETURN}>
            {this._genPostList(
              "outPostList-returnNote-react",
              returnAlertPosts
            )}
          </TabPanel>
          <TabPanel show={selectTab === OutPostTabEnum.HISTORY}>
            <PostUserHistoryListStyle>
              <OutPostAllHistoryList shares={returnShares} />
            </PostUserHistoryListStyle>
          </TabPanel>
        </AppCenterWrapStyle>
      </Fragment>
    );
  }

  render() {
    const {
      //crud
      isOpenCrudDialog,
      isCrudingPost,
      postIdForDialogToCreateOrUpdate,

      //decide
      isOpenDecisionDialog,
      curDecidePostId
    } = this.state;

    const {
      //data
      posts,
      isInitPosts,
      isFetchingPosts,

      //decide
      onUndoApproveShare,
      onUndoDenyShare,
      onDecideShare
    } = this.props;

    return (
      <div id="outPostManagementComponent-react">
        {isFetchingPosts && (
          <h1 className="text-center">
            <LoadingIcon text="loading" />
          </h1>
        )}
        {isInitPosts && this._getPostsContent()}

        {isOpenCrudDialog && (
          <OutPostCrudDialog
            isOpen={isOpenCrudDialog}
            post={
              postIdForDialogToCreateOrUpdate === null
                ? null
                : posts.find(
                    post => post.id === postIdForDialogToCreateOrUpdate
                  )
            }
            isCrudingPost={isCrudingPost}
            onOk={this.onCrudDialogOk}
            onCancel={this.onCrudDialogCancel}
          />
        )}

        {isOpenDecisionDialog && (
          <OutPostDecisionDialog
            isOpen={isOpenDecisionDialog}
            post={posts.find(post => post.id === curDecidePostId)}
            onUndoApproveShare={onUndoApproveShare}
            onUndoDenyShare={onUndoDenyShare}
            onDecideShare={onDecideShare}
            onExit={this.onExitDecisionDialog}
          />
        )}
      </div>
    );
  }
}

export default OutPostManagementWebView;
