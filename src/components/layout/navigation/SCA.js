import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { popAsync, uiActions } from "../../../store/ui-slice";
import { cartActions } from "../../../store/cart-slice";
import { accountActions } from "../../../store/account-slice";

const SCA = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  const alerts = useSelector((state) => state.ui.alerts);
  const navigate = useNavigate();

  const color = "#262626";
  const size = 1.55;
  let isAnythingBought = useSelector((state) => state.cart.isAnythingBought);

  const cartBtnHandler = () => {
    if (!isLoggedIn) {
      dispatch(
        uiActions.putNewAlert({
          status: "error",
          message: "first you must logging in",
        })
      );
      dispatch(popAsync(5000));
      return;
    }
    dispatch(uiActions.showCart());
  };
  const accountBtnHandler = () => {
    if (isLoggedIn) {
      if (alerts.length === 1) {
        if(alerts[0].message === "click again to log out") {
          dispatch(cartActions.clearEveryThing());
          dispatch(accountActions.loggingOut());
          dispatch(
            uiActions.putNewAlert({
              status: "success",
              message: "you logout successfully",
            })
          );
          dispatch(popAsync(5000));
          return;
        }
      }
      dispatch(
        uiActions.putNewAlert({
          status: "info",
          message: "click again to log out",
        })
      );
      dispatch(popAsync(5000));
      return;
    }
    navigate("/signup");
  };

  return (
    <div className="hidden flex-row items-center justify-between space-x-5 children:transition hover:children:scale-125 md:flex">
      <Link to="/menu/search">
        <SearchIcon color={color} size={size} />
      </Link>
      <button onClick={cartBtnHandler} className="relative">
        {isAnythingBought && <Ping />}
        <CartIcon color={color} size={size} />
      </button>
      <button onClick={accountBtnHandler}>
        <AccountIcon color={color} size={size} />
      </button>
    </div>
  );
};

export const SearchIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size + "em"}
      height={props.size + "em"}
      viewBox="0 0 24 24"
    >
      <path
        fill={props.color}
        d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7c-3.868 0-7 3.132-7 7c0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
      ></path>
    </svg>
  );
};

export const CartIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size + "em"}
      height={props.size + "em"}
      viewBox="0 0 512 512"
    >
      <path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M80 176a16 16 0 0 0-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 0 0-16-16Zm80 0v-32a96 96 0 0 1 96-96h0a96 96 0 0 1 96 96v32"
      ></path>
    </svg>
  );
};

export const AccountIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size + 0.5 + "em"}
      height={props.size + 0.5 + "em"}
      viewBox="0 0 24 24"
    >
      <path
        fill={props.color}
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"
      ></path>
    </svg>
  );
};

const Ping = () => {
  return (
    <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-90" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-600" />
    </span>
  );
};

export default SCA;
