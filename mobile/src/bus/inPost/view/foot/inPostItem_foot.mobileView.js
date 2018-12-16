import React from "react";
import { View, Text } from "react-native";

// import PostItemFootStyle from "../../../post/style/postItem_foot_style";
// import InPostItemFootShopWebView from "./inPostItem_foot_shop.webView";
// import InPostItemFootRequestController from "@gn/common/bus/inPost/controller/foot/inPostItem_foot_request.controller";
// import InPostItemFootRequestWebView from "./inPostItem_foot_request.webView";
// import InPostItemFootBorrowController from "@gn/common/bus/inPost/controller/foot/inPostItem_foot_borrow.controller";
// import InPostItemFootBorrowWebView from "./inPostItem_foot_borrow.webView";
// import InPostItemFootViewPropType from "@gn/common/bus/inPost/propType/foot/inPostItem_foot.view.propType";
// import InPostItemFootShopController from "@gn/common/bus/inPost/controller/foot/inPostItem_foot_shop.controller";
import InPostItemFootViewPropType from "../../../../common/bus/inPost/propType/foot/inPostItem_foot.view.propType";
import InPostItemFootShopController from "../../../../common/bus/inPost/controller/foot/inPostItem_foot_shop.controller";
import InPostItemFootShopMobileView from "./inPostItem_foot_shop.mobileView";

function InPostItemFootMobileView(props) {
  const { postId, myRequestShareId, myBorrowShareId, isActivePost } = props;

  // if (myRequestShareId) {
  //   content = (
  //     <InPostItemFootRequestController
  //       myRequestShareId={myRequestShareId}
  //       view={InPostItemFootRequestWebView}
  //     />
  //   );
  // } else if (myBorrowShareId) {
  //   content = (
  //     <InPostItemFootBorrowController
  //       myBorrowShareId={myBorrowShareId}
  //       view={InPostItemFootBorrowWebView}
  //     />
  //   );
  // } else if (isActivePost) {
  //   content = (
  //     <InPostItemFootShopController
  //       postId={postId}
  //       view={InPostItemFootShopWebView}
  //     />
  //   );
  // } else {
  //   content = <div>Post is no longer active</div>;
  // }

  if (isActivePost) {
    content = (
      <InPostItemFootShopController
        postId={postId}
        view={InPostItemFootShopMobileView}
      />
    );
  } else {
    content = (
      <View>
        <Text>Post is no longer active</Text>
      </View>
    );
  }

  return <View>{content}</View>;
}
InPostItemFootMobileView.propTypes = InPostItemFootViewPropType;

export default InPostItemFootMobileView;
