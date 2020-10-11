import React from "react";
import {
  ScrollView,
  FlatList,
  Text,
  View,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

const ProductsDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  return (
    <View>
      <Text>Products Detail Screen</Text>
      <Text>{selectedProduct.title} </Text>
    </View>
  );
};

ProductsDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

export default ProductsDetailScreen;
