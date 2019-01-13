import React from "react";
import { Container, Content, Header, Text, Button, View } from "native-base";
import LoadingIconMobileView from "../../../share/LoadingIcon.mobileView";
import ProfileManagementPropType from "@gn/common/bus/profile/propType/profileManagement.propType";

function ProfileManagementMobileView(props) {
  const { isLoggingOut, loginUser, onLogOut } = props;

  return (
    <Container>
      <Header>
        <Text>{loginUser.getNameAndEmail()}</Text>
      </Header>
      <Content>
        <View style={{ alignItems: "center" }}>
          {isLoggingOut ? (
            <LoadingIconMobileView text="logging out" />
          ) : (
            <Button style={{ alignSelf: "center" }} onPress={onLogOut}>
              <Text>Logout</Text>
            </Button>
          )}
        </View>
      </Content>
    </Container>
  );
}
ProfileManagementMobileView.propTypes = ProfileManagementPropType;
export default ProfileManagementMobileView;
