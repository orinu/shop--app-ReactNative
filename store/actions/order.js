const ADD_ORDER = "ADD_ORDER";
import Order from "../../models/order";

export const fetchOrder = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://shop-5602b.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Somthing went wrong!");
      }
      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItem,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({
        type: "SET_ORDERS",
        orders: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItem, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date().toISOString();
    const response = await fetch(
      `https://shop-5602b.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItem,
          totalAmount,
          date: date,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Somting go wrong");
    }
    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItem,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
