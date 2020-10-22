import React from "react";
import { FlatList, Button, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import headerButton from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

import Colors from "../../constants/Color";
const UserProductsScreen = (props) => {
  const userPruducts = useSelector((state) => state.products.userProducts);
  return (
    <FlatList
      data={userPruducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(cartAction.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Yours Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={headerButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
