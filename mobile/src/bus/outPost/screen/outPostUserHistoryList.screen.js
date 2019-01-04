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
import OutPostUserHistoryListPropType from "../../../common/bus/outPost/propType/outPostUserHistoryList.propTypes";

function OutPostUserHistoryListScreen(props) {
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
                <Text note>{date2String(share.dateReturn)}</Text>
              </Body>
              <Right>
                <Text>{share.borrower.getNameAndEmail()}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
}

OutPostUserHistoryListScreen.propTypes = OutPostUserHistoryListPropType;

export default OutPostUserHistoryListScreen;
