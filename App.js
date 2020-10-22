import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import productsReducer from "./store/reducers/products";
import oerdersReducer from "./store/reducers/order";
import CartReducer from "./store/reducers/cart";

import ShopNavigator from "./navigation/shopNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: CartReducer,
  orders: oerdersReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
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
