import React, { Fragment } from "react";
import { Button, Text } from "native-base";
import LoadingIconMobileView from "../../../share/LoadingIcon.mobileView";
import OutPostItemFootPropType from "../../../common/bus/outPost/propType/outPostItemFoot.propType";

function OutPostItemFootMobileView(props) {
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
        <View>
          {isAwaringReturn ? (
            <LoadingIconMobileView text={"confirming"} />
          ) : (
            <Button onPress={() => onAwareReturnPostClick(postId)}>
              <Text>{`confirm returned by ${borrowerOfTheLatestUnawareReturn.getNameAndEmail()}`}</Text>
            </Button>
          )}
        </View>
      )}
      {isDecidablePost && (
        <Button onPress={() => onDecidePostClick(postId)}>
          <Text>share</Text>
        </Button>
      )}
    </Fragment>
  );
}
OutPostItemFootMobileView.propTypes = OutPostItemFootPropType;
export default OutPostItemFootMobileView;
