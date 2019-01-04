import React, { Fragment } from "react";
import { Button, Text, View } from "native-base";
import LoadingIconMobileView from "../../../share/LoadingIcon.mobileView";
import OutPostItemFootPropType from "../../../common/bus/outPost/propType/outPostItemFoot.propType";

function OutPostItemFootMobileView(props) {
  const {
    postId,

    //aware
    isAwaringReturn,
    borrowerOfTheLatestUnawareReturn,
    onAwareReturnPost,

    //decide
    isDecidablePost,
    onDecidePostClick
  } = props;
  return (
    <Fragment>
      {borrowerOfTheLatestUnawareReturn && (
        <View>
          {isAwaringReturn ? (
            <LoadingIconMobileView text={"confirming"} />
          ) : (
            <Button small success onPress={() => onAwareReturnPost(postId)}>
              <Text>{`confirm returned by ${borrowerOfTheLatestUnawareReturn.getNameAndEmail()}`}</Text>
            </Button>
          )}
        </View>
      )}
      {isDecidablePost && (
        <Button small success onPress={() => onDecidePostClick(postId)}>
          <Text>share</Text>
        </Button>
      )}
    </Fragment>
  );
}
OutPostItemFootMobileView.propTypes = OutPostItemFootPropType;
export default OutPostItemFootMobileView;
