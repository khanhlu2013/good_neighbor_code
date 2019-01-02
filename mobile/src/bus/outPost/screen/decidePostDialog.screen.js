import React, { Component, Fragment } from "react";
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
  Icon
} from "native-base";
import { date2String } from "../../../common/util";

function CurrentBorrowerMobileView(props) {
  const { isDecidingPost, curBorrowShare, handleUndoApprove } = props;

  return (
    <Fragment>
      <List>
        <ListItem itemHeader>
          <Text>current borrower:</Text>
        </ListItem>
        {curBorrowShare ? (
          <ListItem>
            <Body>
              <Text>{curBorrowShare.borrower.getNameAndEmail()}</Text>
              <Text note>{date2String(curBorrowShare.date)}</Text>
            </Body>
            <Right style={{ flexDirection: "row", marginRight: 25 }}>
              <Button
                warning
                iconLeft
                onPress={() => handleUndoApprove(curBorrowShare.id)}
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
    </Fragment>
  );
}

class DecisionPostDialogScreen extends Component {
  state = {
    isDecidingPost: false
  };

  handleUndoApprove = async shareId => {
    this.setState({ isDecidingPost: true });
    await onUndoApproveShare(shareId);
    this.setState({ isDecidingPost: false });
  };

  render() {
    const { isDecidingPost } = this.state;
    const { navigation, screenProps } = this.props;
    const post = navigation.getParam("post");

    return (
      <Container>
        <Header>
          <Text>{`share '${post.title}' post`}</Text>
        </Header>
        <Content>
          <CurrentBorrowerMobileView
            isDecidingPost={isDecidingPost}
            curBorrowShare={post.curBorrowShare}
            handleUndoApprove={this.handleUndoApprove}
          />

          <Button
            style={{ alignSelf: "center", marginTop: 30 }}
            onPress={() => navigation.pop()}
          >
            <Text>done</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
export default DecisionPostDialogScreen;
