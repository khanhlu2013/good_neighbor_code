import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { nullOrRequiredValidator } from "@gn/common/util";
import Post from "@gn/common/model/post";
import LoadingIcon from "../../../share/loadingIcon";
import AppCenterWrapStyle from "../../../share/style/appCenterWrap_style";
import TabPanel from "../../../share/style/tabPanel_style";
import OutPostCrudDialog from "./crudDialog";
import OutPostDecisionDialog from "./decisionDialog";
import OutPostList from "./outPostList";
import OutPostTabBar from "./outPost_tabBar";
import OutPostTabEnum from "./outPost_tabEnum";
import OutPostAllHistoryList from "./outPost_allHistoryList";
import PostUserHistoryListStyle from "../../post/style/postUser_historyList_style";
import BusinessBannerStyle from "../../../share/style/bannerStyle/businessBanner.style";

class OutPostManagementComponent extends Component {
  static propTypes = {
    //data
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    isInitPosts: PropTypes.bool.isRequired,
    isFetchingPosts: PropTypes.bool.isRequired,

    //derived data
    returnShares: PropTypes.array.isRequired,
    requestAlertPosts: PropTypes.array.isRequired,
    borrowPosts: PropTypes.array.isRequired,
    returnAlertPosts: PropTypes.array.isRequired,

    //crud post
    onCrudDialogOk: PropTypes.func.isRequired,

    //decide post
    curDecidePost: nullOrRequiredValidator("object", Post),
    onDecideShare: PropTypes.func.isRequired,
    onUndoDenyShare: PropTypes.func.isRequired,
    onUndoApproveShare: PropTypes.func.isRequired,
    onOpenDecideDialog: PropTypes.func.isRequired,

    //aware return post
    onAwareReturnPost: PropTypes.func.isRequired,
    awaringReturnPostIds: PropTypes.array.isRequired
  };

  state = {
    selectTab: OutPostTabEnum.ALL,
    //crud
    isOpenCrudDialog: false,
    isCrudingPost: false,
    crudPostDialogPrefill: null,

    //decide
    isOpenDecisionDialog: false
  };

  componentDidMount() {
    this.props.fetchPosts();
  }

  onTabChange = selectTab => {
    this.setState({ selectTab });
  };

  onCrudDialogCancel = () => {
    this.setState({ isOpenCrudDialog: false });
  };

  onExitDecisionDialog = () => {
    this.setState({ isOpenDecisionDialog: false });
  };

  _genPostList = (listId, posts) => (
    <OutPostList
      listId={listId}
      posts={posts}
      onUpdatePost={post => {
        this.setState({ isOpenCrudDialog: true, crudPostDialogPrefill: post });
      }}
      onDecidePost={post => {
        this.setState({ isOpenDecisionDialog: true });
        this.props.onOpenDecideDialog(post);
      }}
      onAwareReturnPostClick={this.props.onAwareReturnPost}
      awaringReturnPostIds={this.props.awaringReturnPostIds}
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
            onCreateNewPostClick={() => {
              this.setState({
                isOpenCrudDialog: true,
                crudPostDialogPrefill: null
              });
            }}
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
      crudPostDialogPrefill,

      //decide
      isOpenDecisionDialog
    } = this.state;

    const {
      //data
      isInitPosts,
      isFetchingPosts,

      //crud
      onCrudDialogOk,

      //decide
      curDecidePost,
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
            post={crudPostDialogPrefill}
            isCrudingPost={isCrudingPost}
            onOk={(postId, title, description, isActive) => {
              this.setState({ isCrudingPost: true });
              onCrudDialogOk(postId, title, description, isActive).then(
                result =>
                  this.setState({
                    isOpenCrudDialog: false,
                    isCrudingPost: false
                  })
              );
            }}
            onCancel={this.onCrudDialogCancel}
          />
        )}

        {isOpenDecisionDialog && (
          <OutPostDecisionDialog
            isOpen={isOpenDecisionDialog}
            post={curDecidePost}
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
OutPostManagementComponent.propType = {
  loginUser: PropTypes.object.isRequired
};

export default OutPostManagementComponent;
