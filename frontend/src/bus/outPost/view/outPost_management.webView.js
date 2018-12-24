import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

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

class OutPostManagementComponentWebView extends Component {
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
    onCreateOrUpdatePost: PropTypes.func.isRequired,

    //decide post
    onDecideShare: PropTypes.func.isRequired,
    onUndoDenyShare: PropTypes.func.isRequired,
    onUndoApproveShare: PropTypes.func.isRequired,

    //aware return post
    onAwareReturnPost: PropTypes.func.isRequired,
    awaringReturnPostIds: PropTypes.array.isRequired
  };

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

  componentDidMount() {
    this.props.fetchPosts();
  }

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

  onExitDecisionDialog = () => {
    this.setState({ isOpenDecisionDialog: false });
  };

  _genPostList = (listId, posts) => (
    <OutPostList
      listId={listId}
      posts={posts}
      onUpdatePost={post => {
        this.setState({
          isOpenCrudDialog: true,
          postIdForDialogToCreateOrUpdate: post.id
        });
      }}
      onDecidePost={post => {
        this.setState({ isOpenDecisionDialog: true, curDecidePostId: post.id });
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
                postIdForDialogToCreateOrUpdate: null
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
OutPostManagementComponentWebView.propType = {
  loginUser: PropTypes.object.isRequired
};

export default OutPostManagementComponentWebView;
