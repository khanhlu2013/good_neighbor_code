import React from "react";
import { View } from "react-native";

function OutPostItemFootMobileView(props) {
  const {
    post,
    isAwaringReturn,
    onAwareReturnClick,
    onDecidePostClick
  } = props;

  return (
    <View>
      {post.unawareReturnShareLatest && (
        <span>
          {isAwaringReturn ? (
            <LoadingIcon text={"confirming"} />
          ) : (
            <button
              id="outPostItem-awareReturnBtn-react"
              onClick={onAwareReturnClick}
              className="btn btn-sm btn-success"
            >
              {`confirm returned by ${post.unawareReturnShareLatest.borrower.getNameAndEmail()}`}
            </button>
          )}
        </span>
      )}
      {(post.denyShares.length !== 0 ||
        post.requestShares.length !== 0 ||
        curBorrowShare) && (
        <button
          id="outPostItem-decisionBtn-react"
          onClick={onDecidePostClick}
          className="btn btn-sm btn-success ml-1"
        >
          share
        </button>
      )}
    </View>
  );
}
