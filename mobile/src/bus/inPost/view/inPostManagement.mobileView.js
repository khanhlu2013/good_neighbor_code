import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Constants } from "expo";
import styled from "styled-components/native";
import InPostItemMobileView from "./inPostItem.mobileView";
import InPostListController from "../../../common/bus/inPost/controller/inPostList.controller";
import PostListNoDataMobileView from "../../post/view/postListNoData.mobileView";

function InPostManagementMobileView(props) {
  const { posts, isFetchingPosts, isInitPosts } = props;

  let content;
  if (!isInitPosts || isFetchingPosts) {
    content = <ActivityIndicator size="large" />;
  } else {
    content = (
      <InPostListController
        posts={posts}
        inPostItemView={InPostItemMobileView}
        noInPostDataIndicatorView={PostListNoDataMobileView}
        wrapperView={View}
        listId="testListId"
      />
    );
  }
  return content;
}
InPostManagementMobileView.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetchingPosts: PropTypes.bool.isRequired,
  isInitPosts: PropTypes.bool.isRequired
};

export default InPostManagementMobileView;
