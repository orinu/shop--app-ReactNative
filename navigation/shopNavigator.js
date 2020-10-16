import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductsDetailScreen from "../screens/shop/ProductsDetailScreen";
import CartScreen from "../screens/shop/CartScreen";

import Colors from "../constants/Color";

const productsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductsDetail: ProductsDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor:
        Platform.OS === "android" ? Colors.primary : Colors.primary,
    },
  }
);

export default createAppContainer(productsNavigator);
