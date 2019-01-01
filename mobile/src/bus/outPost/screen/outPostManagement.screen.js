import React, { Component, Fragment } from "react";
import { Switch, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Text,
  Form,
  Label,
  Left,
  Right,
  ListItem,
  Button
} from "native-base";

import { Formik } from "formik";

import OutPostManagementController from "../../../common/bus/outPost/controller/outPostManagement.controller";
import { createStackNavigator } from "react-navigation";
import OutPostManagementBottomTabNavigator from "../navigation/outPostManagementBottomTab.navigation";
import LoadingIconMobileView from "../../../share/LoadingIcon.mobileView";
import OutPostItemSchemaValidation from "../../../common/bus/outPost/validation/outPostItem.validation";

const CrudPostDialogScreen = props => {
  const { navigation, screenProps } = props;

  let post = navigation.getParam("post", {});
  const postId = post.id || null;
  const initialValues = {
    title: post.title || "",
    description: post.description || "",
    isActive: post.isActive === undefined ? true : post.isActive
  };

  const handleSubmit = (values, actions) => {
    screenProps
      .onCreateOrUpdatePost(
        postId,
        values.title,
        values.description,
        values.isActive
      )
      .then(() => {
        actions.setSubmitting(false);
        navigation.pop();
      });
  };

  const render = props => {
    console.log(JSON.stringify(props.errors, null, 4));
    return (
      <Container>
        <Content>
          <Header>
            <Text>Edit post</Text>
          </Header>
          <Form>
            <Item floatingLabel>
              <Label style={props.errors.title ? { color: "red" } : {}}>
                {`title${props.errors.title ? `: ${props.errors.title}` : ""}`}
              </Label>
              <Input
                onChangeText={props.handleChange("title")}
                value={props.values.title}
              />
            </Item>
            <Item floatingLabel last>
              <Label style={props.errors.description ? { color: "red" } : {}}>
                {`description${
                  props.errors.description
                    ? `: ${props.errors.description}`
                    : ""
                }`}
              </Label>
              <Input
                keyboardType="default"
                onChangeText={props.handleChange("description")}
                value={props.values.description}
              />
            </Item>
            <ListItem>
              <Left>
                <Text>is active</Text>
              </Left>
              <Right>
                <Switch
                  onValueChange={value =>
                    props.setFieldValue("isActive", value)
                  }
                  value={props.values.isActive}
                />
              </Right>
            </ListItem>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 40
              }}
            >
              {props.isSubmitting ? (
                <LoadingIconMobileView text="please wait" size="large" />
              ) : (
                <Fragment>
                  <Button
                    disabled={
                      !props.dirty || Object.keys(props.errors).length !== 0
                    }
                    onPress={props.handleSubmit}
                  >
                    <Text>ok</Text>
                  </Button>
                  <Button
                    warning
                    onPress={() => {
                      navigation.pop();
                    }}
                  >
                    <Text>cancel</Text>
                  </Button>
                </Fragment>
              )}
            </View>
          </Form>
        </Content>
      </Container>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OutPostItemSchemaValidation}
      onSubmit={handleSubmit}
      render={render}
    />
  );
};

// const CrudPostDialogScreen = props => <Text>out post crud dialog</Text>;
const DecisionPostDialogScreen = props => <Text>out post decide dialog</Text>;

const OutPostManagementNavigator = createStackNavigator(
  {
    outPost_crudDialog: CrudPostDialogScreen,
    outPost_decisionDialog: DecisionPostDialogScreen,
    outPost_bottomTab: OutPostManagementBottomTabNavigator
  },
  {
    initialRouteName: "outPost_bottomTab",
    headerMode: "none"
  }
);

class OutPostManagementMobileView extends Component {
  onUpdatePostClick = postId => {
    const post = this.props.posts.find(post => post.id === postId);
    this.props.navigation.navigate("outPost_crudDialog", { post });
  };

  onDecidePostClick = postId => {
    this.props.navigation.navigate("outPost_decisionDialog");
  };

  render() {
    const {
      navigation,
      posts,
      requestAlertPosts,
      awaringReturnPostIds,
      onAwareReturnPostClick,
      onCreateOrUpdatePost
    } = this.props;
    const screenProps = {
      posts,
      requestAlertPosts,
      awaringReturnPostIds,
      onUpdatePostClick: this.onUpdatePostClick,
      onDecidePostClick: this.onDecidePostClick,
      onAwareReturnPostClick,
      onCreateOrUpdatePost
    };
    return (
      <OutPostManagementNavigator
        screenProps={screenProps}
        navigation={navigation}
      />
    );
  }
}

function OutPostManagementScreen(props) {
  return (
    <OutPostManagementController
      navigation={props.navigation}
      view={OutPostManagementMobileView}
    />
  );
}
OutPostManagementScreen.router = OutPostManagementNavigator.router;

export default OutPostManagementScreen;
