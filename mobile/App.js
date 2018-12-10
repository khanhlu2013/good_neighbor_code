import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import authReducer from "./src/common/app/reducer/auth.reducer";
import AuthCheckScreen from "./src/app/screen/AuthCheck.screen";
import LoginScreen from "./src/app/screen/Login.screen";
import AuthSelector from "./src/common/app/selector/auth.selector";
import NavigationService from "./NavigationService";

const rootReducer = combineReducers({
  auth: authReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => {
  const loginUser = AuthSelector.loginUser(store.getState());
  if (loginUser !== null) {
    console.log("navigating to private app");
    NavigationService.navigate("PrivateApp");
  }
});
const PrivateAppScreen = function() {
  return <Text>Private app here</Text>;
};
const TopLevelNavigator = createSwitchNavigator(
  {
    AuthCheck: {
      screen: AuthCheckScreen
    },
    Login: {
      screen: LoginScreen
    },
    PrivateApp: {
      screen: PrivateAppScreen
    }
  },
  {
    initialRouteName: "AuthCheck"
  }
);
const AppContainer = createAppContainer(TopLevelNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
