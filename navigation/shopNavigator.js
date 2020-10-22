import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductsDetailScreen from "../screens/shop/ProductsDetailScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import CartScreen from "../screens/shop/CartScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";

import Colors from "../constants/Color";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? 'white' : Colors.primary,
};

const productsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductsDetail: ProductsDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const OrderNavigator = createStackNavigator(
  {
    Order: OrderScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    prodcts: productsNavigator,
    order: OrderNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
