import React, { Fragment } from "react";
import LoadingIcon from "../../../share/loadingIcon";
import OutPostItemFootPropType from "@gn/common/bus/outPost/propType/outPostItemFoot.propType";

function OutPostItemFootWebView(props) {
  const {
    postId,

    //aware
    isAwaringReturn,
    borrowerOfTheLatestUnawareReturn,
    onAwareReturnPostClick,

    //decide
    isDecidablePost,
    onDecidePostClick
  } = props;
  return (
    <Fragment>
      {borrowerOfTheLatestUnawareReturn && (
        <span>
          {isAwaringReturn ? (
            <LoadingIcon text={"confirming"} />
          ) : (
            <button
              id="outPostItem-awareReturnBtn-react"
              onClick={() => onAwareReturnPostClick(postId)}
              className="btn btn-sm btn-success"
            >
              {`confirm returned by ${borrowerOfTheLatestUnawareReturn.getNameAndEmail()}`}
            </button>
          )}
        </span>
      )}
      {isDecidablePost && (
        <button
          id="outPostItem-decisionBtn-react"
          onClick={() => onDecidePostClick(postId)}
          className="btn btn-sm btn-success ml-1"
        >
          share
        </button>
      )}
    </Fragment>
  );
}
OutPostItemFootWebView.propTypes = OutPostItemFootPropType;
export default OutPostItemFootWebView;
