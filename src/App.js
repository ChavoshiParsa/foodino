import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/cart/Cart";
import Loading from "./components/UI/Loading";
import AlertList from "./components/UI/AlertList";
import { fetchCartData, sendCartData } from "./store/http-request";
import axios from "axios";
import { foodDataAction } from "./store/food-data";

const HomePage = React.lazy(() => import("./components/pages/HomePage"));
const MenuPage = React.lazy(() => import("./components/pages/MenuPage"));
const LoginPage = React.lazy(() => import("./components/pages/LoginPage"));

export const API_KEY = "AIzaSyDzUyYENmZFItHDQVHPnNsnKaoCQGK6VPc";
export let username = null;
export let nickName = null;

function App() {
  const dispatch = useDispatch();

  const alerts = useSelector((state) => state.ui.alerts);
  const isCartShown = useSelector((state) => state.ui.isCartShown);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  const userUID = useSelector((state) => state.account.info.userUID);
  const name = useSelector((state) => state.cart.name);

  /*
  useEffect(() => {
    axios.post(
      `https://foodinoo-30aff-default-rtdb.asia-southeast1.firebasedatabase.app/foodData.json`,
      [
        {
          id: "0",
          name: "Grilled Lamb",
          type: "foods",
          rate: 5,
          price: 32,
        },
        {
          id: "1",
          name: "Italian Pasta",
          type: "foods",
          rate: 3,
          price: 42,
        },
        {
          id: "2",
          name: "Italian Pizza",
          type: "foods",
          rate: 4,
          price: 12,
        },
        {
          id: "3",
          name: "Keto Salad",
          type: "salads",
          rate: 5,
          price: 48,
        },
        {
          id: "4",
          name: "Noodle Soup",
          type: "foods",
          rate: 1,
          price: 33,
        },
        {
          id: "5",
          name: "Veggie Bowl",
          type: "salads",
          rate: 2,
          price: 14,
        },
        {
          id: "6",
          name: "Coca Cola",
          type: "drinks",
          rate: 2,
          price: 3,
        },
      ]
    );
  }, []);
  */
  useEffect(() => {
    axios
      .get(
        `https://foodinoo-30aff-default-rtdb.asia-southeast1.firebasedatabase.app/foodData.json`
      )
      .then((response) => {
        dispatch(
          foodDataAction.setFoodData(response.data["-NVdeD3LFHpCg-5vrLYO"])
        );
      });
  });

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    username = userUID;
    nickName = name;
    dispatch(fetchCartData());
  }, [dispatch, isLoggedIn, userUID, name]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch, isLoggedIn]);

  /*
  useEffect(() => {
    dispatch(cartActions.loadCart(userId));
  }, [dispatch, userId]);
  */

  return (
    <Suspense fallback={<Loading />}>
      {isLoading && <Loading />}
      {isCartShown && <Cart />}
      <AlertList alerts={alerts} />
      <Routes>
        <Route path="/*" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/menu" element={<Navigate to="/menu/all" />} />
        <Route path="/menu/*" element={<MenuPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/signin" element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
