import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Header,
  Text,
  Button,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Icon,
  View
} from "native-base";
import { date2String, nullOrRequiredValidator } from "../../../common/util";
import OutPostDecisionDialogController from "../../../common/bus/outPost/controller/outPostDecisionDialog.controller";
import Share from "../../../common/model/share";
import Post from "../../../common/model/post";
import LoadingIconMobileView from "../../../share/LoadingIcon.mobileView";

function DenialListMobileView(props) {
  const { isDecidingPost, denyShares, onUndoDenyShare } = props;

  return (
    <List>
      <ListItem itemDivider>
        <Text>denial list:</Text>
      </ListItem>
      {denyShares.map(share => (
        <ListItem key={share.id} selected>
          <Body>
            <Text>{share.borrower.getNameAndEmail()}</Text>
            <Text note>{date2String(share.dateCreate)}</Text>
          </Body>
          <Right>
            <Button onPress={() => onUndoDenyShare(share.id)} success>
              <Icon name="undo" type="FontAwesome" />
            </Button>
          </Right>
        </ListItem>
      ))}
    </List>
  );
}
DenialListMobileView.propTypes = {
  isDecidingPost: PropTypes.bool.isRequired,
  denyShares: PropTypes.arrayOf(PropTypes.instanceOf(Share)).isRequired,
  onUndoDenyShare: PropTypes.func.isRequired
};

function WaitingListMobileView(props) {
  const { isDecidingPost, requestShares, onDecideShare } = props;
  return (
    <List>
      <ListItem itemDivider>
        <Text>waiting list:</Text>
      </ListItem>
      {requestShares.map(share => (
        <ListItem key={share.id} selected>
          <Body>
            <Text>{share.borrower.getNameAndEmail()}</Text>
            <Text note>{date2String(share.dateCreate)}</Text>
          </Body>
          <Right style={{ flexDirection: "row", marginRight: 25 }}>
            <Button onPress={() => onDecideShare(share.id, true)} success>
              <Icon name="thumbs-up" type="FontAwesome" />
            </Button>
            <Button onPress={() => onDecideShare(share.id, false)} warning>
              <Icon name="thumbs-down" type="FontAwesome" />
            </Button>
          </Right>
        </ListItem>
      ))}
    </List>
  );
}
WaitingListMobileView.propTypes = {
  isDecidingPost: PropTypes.bool.isRequired,
  requestShares: PropTypes.arrayOf(PropTypes.instanceOf(Share)).isRequired,
  onDecideShare: PropTypes.func.isRequired
};

function CurrentBorrowerMobileView(props) {
  const { isDecidingPost, curBorrowShare, onUndoApproveShare } = props;
  return (
    <List>
      <ListItem itemDivider>
        <Text>current borrower:</Text>
      </ListItem>
      {curBorrowShare ? (
        <ListItem>
          <Body>
            <Text>{curBorrowShare.borrower.getNameAndEmail()}</Text>
            <Text note>{date2String(curBorrowShare.dateCreate)}</Text>
          </Body>
          <Right>
            <Button
              warning
              iconLeft
              onPress={() => onUndoApproveShare(curBorrowShare.id)}
            >
              <Icon name="undo" type="FontAwesome" />
              <Text>undo</Text>
            </Button>
          </Right>
        </ListItem>
      ) : (
        <ListItem>
          <Body>
            <Text>none</Text>
          </Body>
        </ListItem>
      )}
    </List>
  );
}
CurrentBorrowerMobileView.propTypes = {
  isDecidingPost: PropTypes.bool.isRequired,
  curBorrowShare: nullOrRequiredValidator("object", Share),
  onUndoApproveShare: PropTypes.func.isRequired
};

function DecisionPostDialogView(props) {
  const {
    navigation,
    onUndoApproveShare,
    onUndoDenyShare,
    onDecideShare,
    isDecidingPost,
    curDecidePost
  } = props;

  const post = curDecidePost;

  return (
    <Container>
      <Header>
        <Text>{`share '${post.title}' post`}</Text>
      </Header>

      {isDecidingPost ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <LoadingIconMobileView text="please wait" />
        </View>
      ) : (
        <Content>
          <CurrentBorrowerMobileView
            isDecidingPost={isDecidingPost}
            curBorrowShare={post.curBorrowShare}
            onUndoApproveShare={onUndoApproveShare}
          />

          <WaitingListMobileView
            isDecidingPost={isDecidingPost}
            requestShares={post.requestShares}
            onDecideShare={onDecideShare}
          />

          <DenialListMobileView
            isDecidingPost={isDecidingPost}
            denyShares={post.denyShares}
            onUndoDenyShare={onUndoDenyShare}
          />

          <Button
            style={{ alignSelf: "center", marginTop: 30 }}
            onPress={() => navigation.pop()}
          >
            <Text>done</Text>
          </Button>
        </Content>
      )}
    </Container>
  );
}

DecisionPostDialogView.propTypes = {
  navigation: PropTypes.object.isRequired,
  onUndoApproveShare: PropTypes.func.isRequired,
  onUndoDenyShare: PropTypes.func.isRequired,
  onDecideShare: PropTypes.func.isRequired,
  isDecidingPost: PropTypes.bool.isRequired,
  curDecidePost: PropTypes.instanceOf(Post)
};

function DecisionPostDialogScreen(props) {
  const { screenProps, navigation } = props;

  const {
    onUndoApproveShare,
    onUndoDenyShare,
    onDecideShare,
    curDecidePost
  } = screenProps;
  return (
    <OutPostDecisionDialogController
      view={DecisionPostDialogView}
      navigation={navigation}
      onUndoApproveShare={onUndoApproveShare}
      onUndoDenyShare={onUndoDenyShare}
      onDecideShare={onDecideShare}
      curDecidePost={curDecidePost}
    />
  );
}

export default DecisionPostDialogScreen;
