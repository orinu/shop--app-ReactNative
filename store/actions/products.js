import Product from "../../models/product";

export const fetchProduct = () => {
  return async (dispatch, getState) => {
    const uId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://shop-5602b.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Somthing went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].userId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      const userProducts = loadedProducts.filter(
        (prod) => prod.ownerId === uId
      );
      dispatch({
        type: "SET_PRODUCTS",
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === uId),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (ProductId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shop-5602b.firebaseio.com/products/${ProductId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Somthing went wrong!");
    }
    dispatch({
      type: "DELETE_PRODUCT",
      pid: ProductId,
    });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://shop-5602b.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          userId,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: "CREATE_PRODUCT",
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        userId,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shop-5602b.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Somthing went wrong!");
    }

    dispatch({
      type: "UPDATE_PRODUCT",
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
