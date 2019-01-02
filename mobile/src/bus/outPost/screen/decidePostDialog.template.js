import React, { Component } from "react";
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

class DecisionPostDialogScreen extends Component {
  render() {
    const { navigation, screenProps } = this.props;
    const post = navigation.getParam("post");

    return (
      <Container>
        <Header>
          <Text>{`share '${post.title}' post`}</Text>
        </Header>
        <Content>
          <List>
            <ListItem itemHeader>
              <Text>waiting list</Text>
            </ListItem>
            <ListItem selected>
              <Body>
                <Text>khanh tran</Text>
                <Text note>xx/xx/xx</Text>
              </Body>
              <Right style={{ flexDirection: "row", marginRight: 25 }}>
                <Button success>
                  <Icon name="thumbs-up" type="FontAwesome" />
                </Button>
                <Button warning>
                  <Icon name="thumbs-down" type="FontAwesome" />
                </Button>
              </Right>
            </ListItem>
            <ListItem last selected>
              <Body>
                <Text>khanh tran</Text>
                <Text note>xx/xx/xx</Text>
              </Body>
              <Right style={{ flexDirection: "row", marginRight: 25 }}>
                <Button success>
                  <Icon name="thumbs-up" type="FontAwesome" />
                </Button>
                <Button warning>
                  <Icon name="thumbs-down" type="FontAwesome" />
                </Button>
              </Right>
            </ListItem>
          </List>

          <List>
            <ListItem itemHeader>
              <Text>denial list</Text>
            </ListItem>
            <ListItem selected>
              <Body>
                <Text>khanh tran</Text>
                <Text note>xx/xx/xx</Text>
              </Body>
              <Right style={{ flexDirection: "row", marginRight: 25 }}>
                <Button success>
                  <Icon name="thumbs-up" type="FontAwesome" />
                </Button>
                <Button warning>
                  <Icon name="thumbs-down" type="FontAwesome" />
                </Button>
              </Right>
            </ListItem>
            <ListItem last selected>
              <Body>
                <Text>khanh tran</Text>
                <Text note>xx/xx/xx</Text>
              </Body>
              <Right style={{ flexDirection: "row", marginRight: 25 }}>
                <Button success>
                  <Icon name="thumbs-up" type="FontAwesome" />
                </Button>
                <Button warning>
                  <Icon name="thumbs-down" type="FontAwesome" />
                </Button>
              </Right>
            </ListItem>
          </List>

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
