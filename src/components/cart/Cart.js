import { useDispatch, useSelector } from "react-redux";
import CartList from "./CartList";
import { popAsync, uiActions } from "../../store/ui-slice";
import { cartActions } from "../../store/cart-slice";

const Cart = () => {
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const items = useSelector((state) => state.cart.items);

  const closeHandler = () => {
    dispatch(uiActions.hideCart());
  };

  const removeAllHandler = () => {
    dispatch(cartActions.removeAll());
    if (totalAmount !== 0) {
      dispatch(
        uiActions.putNewAlert({
          status: "success",
          message: `${totalAmount} foods removed`,
        })
      );
      dispatch(popAsync(5000));
    }
  };

  const orderHandler = () => {};

  return (
    <>
      <div
        className="fixed z-20 h-screen w-screen bg-[#000000cc]"
        onClick={closeHandler}
      />
      <div className="fixed top-20 left-[50%] z-30 -ml-40 flex flex-col items-center justify-between space-y-4 rounded-xl bg-white px-4 py-3 shadow-xl md:top-24 md:-ml-60 md:space-y-5 md:px-5 md:py-4">
        <CartList items={items} />
        <div className="flex w-full flex-row items-center justify-between">
          <h4 className="font-pop text-xl font-bold md:text-2xl">
            Total Amount
          </h4>
          <span className="font-pop text-xl text-orange-800 md:text-2xl">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex w-full flex-row items-center justify-end space-x-2">
          <button
            className="mr-auto justify-self-start rounded-full bg-gradient-to-r from-lime-500 to-lime-400 px-3 py-1 font-rubik text-base text-white transition hover:from-orange-500 hover:to-orange-400 active:bg-orange-700 md:px-5 md:text-lg"
            onClick={removeAllHandler}
          >
            Remove All
          </button>
          <button
            className="rounded-full border border-orange-700 bg-white px-3 py-1 font-rubik text-base text-orange-700 transition hover:bg-orange-700 hover:text-white active:bg-orange-600 md:px-5 md:text-lg"
            onClick={closeHandler}
          >
            Close
          </button>
          <button
            className="rounded-full border border-orange-800 bg-orange-800 px-3 py-1 font-rubik text-base text-white transition hover:border-orange-600 hover:bg-orange-600 active:bg-orange-700 md:px-5 md:text-lg"
            onClick={orderHandler}
          >
            Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
