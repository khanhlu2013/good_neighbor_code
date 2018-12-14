import React from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import BackdoorLoginViewPropType from "../../common/app/propType/backdoorLogin.view.propType";

function BackDoorLoginMobileView(props) {
  const {
    isEmailValid,
    isNameRequire,
    nameIsEmpty,
    //---
    isSubmitFormClicked,
    isAjaxing,
    email,
    name,
    //---
    onSubmit,
    onEmailChange,
    onNameChange
  } = props;
  //derived variable
  const isTryToSubmitInvalidEmail = isSubmitFormClicked && !isEmailValid;
  const nameIsRequireButEmpty = isNameRequire && nameIsEmpty;

  //calculate styles
  const submitButtonStyle = getSubmitButtonStyle(
    isEmailValid,
    isTryToSubmitInvalidEmail,
    isNameRequire,
    nameIsEmpty,
    nameIsRequireButEmpty
  );
  const emailInputStyle = getEmailInputStyle(isTryToSubmitInvalidEmail);
  const nameInputStyle = getNameInputStyle(isNameRequire);

  return (
    <View style={containerStyles.x}>
      <View style={headerStyles.container}>
        <Text style={headerStyles.text}>backdoor login</Text>
      </View>
      <TextInput
        style={emailInputStyle}
        placeholder="email"
        onChangeText={text => onEmailChange(text)}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <TextInput
        style={nameInputStyle}
        placeholder="name"
        onChangeText={text => onNameChange(text)}
        autoCapitalize="words"
        autoCorrect={false}
      />
      {isNameRequire && (
        <Text style={{ color: "red" }}>
          email is not found. Name is require to create new account
        </Text>
      )}
      {isAjaxing ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity style={submitButtonStyle} onPress={onSubmit}>
          <Text>backdoor login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
BackDoorLoginMobileView.propTypes = BackdoorLoginViewPropType;
export default BackDoorLoginMobileView;

// STYLE DECLARATION ----------------------------------
const SPACE_BETWEEN_ITEMS = 2;
const BORDER_RADIUS = 3;
const BORDER_WIDTH = 1;
const submitButtonStyles = StyleSheet.create({
  normal: {
    alignItems: "center",
    padding: 10,
    color: "white",
    marginTop: SPACE_BETWEEN_ITEMS,
    borderRadius: BORDER_RADIUS
  },
  emailIsNotValid: {
    backgroundColor: "darkgray"
  },
  tryToSubmitInvalidEmail: {
    backgroundColor: "orange"
  },
  nameIsRequiredButEmpty: {
    backgroundColor: "red"
  },
  formLookGood: { backgroundColor: "greenyellow" }
});

const inputStyles = StyleSheet.create({
  normalShare: {
    height: 40,
    borderColor: "black",
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS
  },
  normalEmail: { marginTop: 7 },
  normalName: {
    marginTop: SPACE_BETWEEN_ITEMS
  },
  email_tryToSubmitInvalidEmail: { borderColor: "red" },
  name_nameIsRequired: { borderColor: "red" }
});

const headerStyles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  text: {
    fontSize: 25
  }
});

const containerStyles = StyleSheet.create({
  x: {
    backgroundColor: "rgb(247, 208, 177)",
    padding: 5
  }
});
// STYLE HELPER -------------------------------------------
function getSubmitButtonStyle(
  isEmailValid,
  isTryToSubmitInvalidEmail,
  isNameRequire,
  nameIsEmpty,
  nameIsRequireButEmpty
) {
  const result = [submitButtonStyles.normal];
  if (!isEmailValid) {
    result.push(submitButtonStyles.emailIsNotValid);
  }
  if (isTryToSubmitInvalidEmail) {
    result.push(submitButtonStyles.tryToSubmitInvalidEmail);
  }
  if (nameIsRequireButEmpty) {
    result.push(submitButtonStyles.nameIsRequiredButEmpty);
  }
  if (isEmailValid && (!isNameRequire || (isNameRequire && !nameIsEmpty))) {
    result.push(submitButtonStyles.formLookGood);
  }
  return result;
}

function getEmailInputStyle(isTryToSubmitInvalidEmail) {
  const result = [inputStyles.normalShare, inputStyles.normalEmail];
  if (isTryToSubmitInvalidEmail) {
    result.push(inputStyles.email_tryToSubmitInvalidEmail);
  }
  return result;
}

function getNameInputStyle(nameIsRequire) {
  const result = [inputStyles.normalShare, inputStyles.normalName];
  if (nameIsRequire) {
    result.push(inputStyles.name_nameIsRequired);
  }
  return result;
}
