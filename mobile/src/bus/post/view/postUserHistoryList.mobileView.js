import React from "react";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Text
} from "native-base";
import { date2String } from "../../../common/util";
import PostUserHistoryListPropType from "../../../common/bus/post/propType/postUserHistoryList.propTypes";

function PostUserHistoryListMobileView(props) {
  const { shares } = props;

  return (
    <Container>
      <Header>
        <Text>History</Text>
      </Header>

      <Content>
        <List>
          {shares.map(share => (
            <ListItem thumbnail key={share.id}>
              <Body>
                <Text>{share.post.title}</Text>
                <Text note>{share.borrower.getNameAndEmail()}</Text>
              </Body>
              <Right>
                <Text>{date2String(share.dateReturn)}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
}

PostUserHistoryListMobileView.propTypes = PostUserHistoryListPropType;

export default PostUserHistoryListMobileView;
