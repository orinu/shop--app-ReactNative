import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const addProduct = action.product;
      const prodPrice = addProduct.price;
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
      } else {
        updateOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
        console.log(updateOrNewCartItem);
        console.log(id);
      }
      return {
        ...state,
        items: { ...state.items, [addProduct.id]: updateOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
  }
  return state;
};
