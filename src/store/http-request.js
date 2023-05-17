import { username } from "../App";
import { cartActions } from "./cart-slice";
import { popAsync, uiActions } from "./ui-slice";
import axios from "axios";

const client = axios.create({
  baseURL:
    "https://foodinoo-30aff-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await client.get(`/${username}.json`);
      // if (!response.ok) {
      //   throw new Error("Could not fetch cart data!");
      // }
      return response.data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          name: cartData.name,
          isAnythingBought: cartData.isAnythingBought,
          totalAmount: cartData.totalAmount,
          totalPrice: cartData.totalPrice,
          items: cartData.items || [],
        })
      );
    } catch (error) {
      // console.log("receiving")
      // dispatch(
      //   uiActions.putNewAlert({
      //     status: "error",
      //     message: error.message,
      //   })
      // );
      // dispatch(popAsync(5000));
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading(true));

    const sendRequest = async () => {
      await client.put(`/${cart.username || username}.json`, {
        name: cart.name,
        isAnythingBought: cart.isAnythingBought,
        totalAmount: cart.totalAmount,
        totalPrice: cart.totalPrice,
        items: cart.items,
      });

      // dispatch(uiActions.setLoading(false));
      // throw new Error("Sending cart data failed");
    };

    try {
      await sendRequest();
      /*
      dispatch(
        uiActions.putNewAlert({
          status: "success",
          message: "Sending cart data was successful",
        })
      );
      dispatch(popAsync(5000));
      */
    } catch (error) {
      // console.log("sending")
      dispatch(
        uiActions.putNewAlert({
          status: "error",
          message: error.message,
        })
      );
      dispatch(popAsync(5000));
    }
    dispatch(uiActions.setLoading(false));
  };
};
