import React from "react";
import { FlatList, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import headerButton from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";
import OrderItem from '../../components/shop/OrderItem';


const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.order);
  console.log('the order array is: ', orders)
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return <OrderItem 
                amount={itemData.item.totalAmount} 
                date={itemData.item.readableDate}
                items={itemData.item.items}
                deletable={false}
                />
      }}
    />
  );
};

OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Yours Order",
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

export default OrderScreen;
