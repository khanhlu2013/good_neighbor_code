import React from "react";
import {
  Text,
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  ListItem,
  List,
  Button,
  Icon
} from "native-base";
import ConnectionFilter from "../../../../../common/bus/connection/connection.filter";
import LoadingIconMobileView from "../../../share/LoadingIcon.mobileView";

function FriendConnectionScreen(props) {
  const { screenProps } = props;
  const {
    connections,
    loginUser,
    onUpdateConnection,
    updatingConnectionIds
  } = screenProps;

  const friendConnections = ConnectionFilter.friend(connections, loginUser.id);

  return (
    <Container>
      <Header>
        <Text>friends</Text>
      </Header>
      <Content>
        <List>
          {friendConnections.map(connection => {
            const user = connection.getTheOtherUser(loginUser.id);
            const isUpdatingConnection = updatingConnectionIds.includes(
              connection.id
            );
            return (
              <ListItem key={connection.id}>
                <Body>
                  <Text>{user.name}</Text>
                  <Text note>{user.email}</Text>
                </Body>
                <Right>
                  {isUpdatingConnection ? (
                    <LoadingIconMobileView text={""} />
                  ) : (
                    <Button
                      onPress={() => onUpdateConnection(connection.id, false)}
                      warning
                    >
                      <Icon name="trash" type="FontAwesome" />
                    </Button>
                  )}
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
}

export default FriendConnectionScreen;
