// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import fetchInPosts from "../../../common/bus/inPost/action/fetchInPosts.action";
// import InPostSelector from "../../../common/bus/inPost/inPost.selector";

// class _ extends Component {
//   static propTypes = {
//     //init data
//     fetchInPosts: PropTypes.func.isRequired,
//     //raw
//     posts: PropTypes.array.isRequired,
//     isFetchingPosts: PropTypes.bool.isRequired,
//     isInitPosts: PropTypes.bool.isRequired,
//     //calculated
//     requestPosts: PropTypes.array.isRequired,
//     borrowPosts: PropTypes.array.isRequired,
//     approveAlertPosts: PropTypes.array.isRequired,
//     returnShares: PropTypes.array.isRequired,
//     //view
//     view: PropTypes.func.isRequired
//   };

//   componentDidMount() {
//     this.props.fetchInPosts();
//   }

//   render() {
//     const { view, posts, isFetchingPosts, isInitPosts } = this.props;
//     return React.createElement(view, { posts, isFetchingPosts, isInitPosts });
//   }
// }

// const mapStateToProps = (state, ownProps) => ({
//   posts: InPostSelector.posts(state),
//   isFetchingPosts: InPostSelector.isFetchingPosts(state),
//   isInitPosts: InPostSelector.isInitPosts(state),
//   //calculate data
//   requestPosts: InPostSelector.requestPosts(state),
//   borrowPosts: InPostSelector.borrowPosts(state),
//   approveAlertPosts: InPostSelector.approveAlertPosts(state),
//   returnShares: InPostSelector.returnShares(state)
// });
// const mapDispatchToProps = (dispatch, ownProps) => ({
//   fetchInPosts: () => {
//     dispatch(fetchInPosts());
//   }
// });
// const InPostManagementController = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_);

// export default InPostManagementController;
