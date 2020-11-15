import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

import productsReducer from "./store/reducers/products";
import oerdersReducer from "./store/reducers/order";
import CartReducer from "./store/reducers/cart";
import AuthReducer from "./store/reducers/auth";

import NavigationContainer from "./navigation/NavigationContainer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: CartReducer,
  orders: oerdersReducer,
  auth: AuthReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
); //composeWithDevTools(),

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
