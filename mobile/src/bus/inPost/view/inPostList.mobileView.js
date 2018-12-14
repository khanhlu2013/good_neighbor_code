import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import InPostItemMobileView from "./inPostItem.mobileView";
import PostListNoDataMobileView from "../../post/view/postListNoData.mobileView";
import InPostListController from "../../../common/bus/inPost/controller/inPostList.controller";
import InPostListViewPropType from "../../../common/bus/inPost/propType/inPostList.view.propType";

function InPostListMobileView(props) {
  const { listId, posts } = props;
  return (
    <View id={listId}>
      <InPostListController
        posts={posts}
        inPostItemView={InPostItemMobileView}
        noInPostDataIndicatorView={PostListNoDataMobileView}
      />
    </View>
  );
}
InPostListMobileView.propTypes = InPostListViewPropType;

export default InPostListMobileView;
