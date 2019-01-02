import React, { Fragment } from "react";
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
    return (
      <Container>
        <Content>
          <Header>
            <Text>{postId ? "edit post" : "create post"}</Text>
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
            <Item floatingLabel>
              <Label style={props.errors.description ? { color: "red" } : {}}>
                {`description${
                  props.errors.description
                    ? `: ${props.errors.description}`
                    : ""
                }`}
              </Label>
              <Input
                onChangeText={props.handleChange("description")}
                value={props.values.description}
              />
            </Item>
            <ListItem>
              <Left>
                <Label>is active</Label>
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

export default CrudPostDialogScreen;
