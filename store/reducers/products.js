import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    case "CREATE_PRODUCT":
      const newProduct = new Product(
        action.productData.id,
        action.productData.userId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.desctiption,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case "UPDATE_PRODUCT":
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updateProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.desctiption,
        state.userProducts[productIndex].price
      );
      const updateUserProducts = [...state.userProducts];
      updateUserProducts[productIndex] = updateProduct;

      const avilableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updateAvilableProduct = [...state.availableProducts];
      updateAvilableProduct[avilableProductIndex] = updateProduct;
      return {
        ...state,
        availableProducts: updateAvilableProduct,
        userProducts: updateUserProducts,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
  }
  return state;
};
