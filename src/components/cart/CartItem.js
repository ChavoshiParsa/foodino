import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const payload = { id: props.id, name: props.name, price: props.price };

  const addHandler = () => {
    dispatch(cartActions.addCart(payload));
  };

  const removeHandler = () => {
    dispatch(cartActions.remove(payload));
  };

  return (
    <div className="flex flex-row items-center justify-between py-5">
      <div className="flex flex-col items-center justify-between space-y-2 md:space-y-3">
        <h2 className="self-start font-pop text-xl md:text-2xl font-bold text-for">
          {props.name}
        </h2>
        <div className="flex w-full flex-row justify-between space-x-12 md:space-x-16">
          <span className="self-start text-base md:text-lg font-bold text-orange-800">
            ${(props.amount * props.price).toFixed(2)}
          </span>
          <span className="rounded-md border border-slate-300 px-2 py-px font-bold">
            × {props.amount}
          </span>
        </div>
      </div>
      <div className="m-2 flex flex-row space-x-2">
        <button
          onClick={removeHandler}
          className="md:h-8 h-6 rounded-md border border-orange-800 px-3 md:px-4 text-lg md:text-xl text-orange-800 transition hover:bg-orange-800 hover:text-white active:bg-orange-700"
        >
          -
        </button>
        <button
          className="md:h-8 h-6 rounded-md border border-orange-800 px-3 md:px-4 text-lg md:text-xl text-orange-800 transition hover:bg-orange-800 hover:text-white active:bg-orange-700"
          onClick={addHandler}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
