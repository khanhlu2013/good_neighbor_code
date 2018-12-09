import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import AppView from "./src/app/view/app.view";
import AppConnect from "./src/common/app/connect/app.connect";
import authReducer from "./src/common/app/reducer/auth.reducer";

const rootReducer = combineReducers({
  auth: authReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppConnect view={AppView} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
