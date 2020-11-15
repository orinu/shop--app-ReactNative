import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const addProduct = action.product;
      const prodPrice = parseFloat(addProduct.price);
      const prodTitle = addProduct.title;

      let updateOrNewCartItem;

      if (state.items[addProduct.id]) {
        //already have the item in the card
        updateOrNewCartItem = new CartItem(
          state.items[addProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addProduct.id].sum + prodPrice
        );
        // console.log("updateOrNewCartItem", updateOrNewCartItem);
      } else {
        updateOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addProduct.id]: updateOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
    case "REMOVE_FROM_CART":
      const slectedItem = state.items[action.productId];
      const currentQuantity = slectedItem.quantity;
      let updatedCartItems;
      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(
          state.items[action.productId].quantity - 1,
          slectedItem.productPrice,
          slectedItem.productTitle,
          slectedItem.sum - slectedItem.productPrice
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - slectedItem.productPrice,
      };
    case "DELETE_PRODUCT":
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    case "ADD_ORDER":
      return initialState;
  }
  return state;
};
