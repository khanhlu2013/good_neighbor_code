import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import authReducer from "@gn/common/app/reducer/auth.reducer";
import AuthCheckScreen from "./src/app/screen/authCheck.screen";
import LoginScreen from "./src/app/screen/login.screen";
import AuthSelector from "@gn/common/app/selector/auth.selector";
import NavigationService from "./src/app/navigationService";
import inPostReducer from "@gn/common/bus/inPost/reducer/inPost.reducer";
import outPostReducer from "@gn/common/bus/outPost/reducer/outPost_reducer";
import PrivateAppScreen from "./src/app/screen/privateApp.screen";

const rootReducer = combineReducers({
  auth: authReducer,
  inPost: inPostReducer,
  outPost: outPostReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => {
  const state = store.getState();
  const loginUser = AuthSelector.loginUser(state);
  if (loginUser !== null) {
    NavigationService.navigate("PrivateApp");
  } else if (AuthSelector.isCheckedAuth(state)) {
    NavigationService.navigate("Login");
  }
});

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
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
}
