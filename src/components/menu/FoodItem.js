import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { popAsync, uiActions } from "../../store/ui-slice";
import { cartActions } from "../../store/cart-slice";

const FoodItem = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);

  const addToCartHandler = () => {
    if (!isLoggedIn) {
      dispatch(
        uiActions.putNewAlert({
          status: "error",
          message: "first you must log in",
        })
      );
      dispatch(popAsync(5000));
      return;
    }
    // adding
    dispatch(
      cartActions.addCart({
        id: props.id,
        name: props.name,
        price: props.price,
      })
    );
    dispatch(
      uiActions.putNewAlert({
        status: "success",
        message: `${props.name} successfully added`,
      })
    );
    dispatch(popAsync(5000));
  };

  const onOrderHandler = () => {
    dispatch(
      uiActions.putNewAlert({
        status: "info",
        message: `This feature can't work for now, we will fix it in future.`,
      })
    );
    dispatch(popAsync(5000));
  };

  return (
    <div className="ml-7 flex flex-row items-center rounded-3xl bg-gradient-to-b from-back to-blue-100 pr-6 shadow-lg transition duration-300 hover:-translate-y-3 hover:scale-105 md:mx-auto">
      <Image src={props.src} alt={props.alt} />
      <div className="flex h-32 flex-col justify-center space-y-1.5 text-left md:h-36 md:space-y-2">
        <div>
          <h3 className="font-rubik text-xl font-bold md:text-2xl">
            {props.name}
          </h3>
          <div className="-mt-1 flex flex-row items-center justify-between space-x-14 md:space-x-16">
            <Stars rate={props.rate} />
            <h4 className="text-sm font-bold text-rose-700 md:text-base">
              ${props.price}.00
            </h4>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <Link
            onClick={onOrderHandler}
            className="self-end text-sm text-orange-500 underline decoration-orange-500 underline-offset-4 transition delay-100 duration-300 hover:animate-pulse hover:text-orange-600 md:text-base"
          >
            Order Now
          </Link>
          <div className="relative h-12 w-12">
            <button
              className="absolute -bottom-9 -right-10  rounded-t-xl rounded-l-xl rounded-br-[30px] bg-orange-600 p-1.5 pb-2.5 pr-2.5 transition hover:scale-105 hover:bg-orange-500"
              onClick={addToCartHandler}
            >
              <AddToCartIcon fill="white" size={1.8} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const Image = (props) => {
  return (
    <div className="relative h-36 w-20 md:h-40 md:w-24">
      <img
        className="absolute -left-5 -top-8 h-28 w-24 overflow-visible object-cover md:w-28"
        src={props.src}
        alt={props.alt}
      />
    </div>
  );
};

const Stars = (props) => {
  const rates = [1, 2, 3, 4, 5];

  const stars = rates.map((item) => (
    <span
      key={item}
      className={props.rate < item ? "text-slate-900" : "text-orange-300"}
    >
      &#9733;
    </span>
  ));

  return (
    <div className="mb-6 flex flex-row items-start justify-between text-center text-base children:mr-2.5 children:inline-block children:h-1 children:w-1 md:text-lg">
      {stars}
    </div>
  );
};

const AddToCartIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${props.size}em`}
      height={`${props.size}em`}
      viewBox="0 0 24 24"
    >
      <path
        fill={props.fill}
        d="M20 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2m-8-2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m1.35 8H5.5c-.92 0-1.69-.62-1.92-1.46l-2.54-9.27C1 10.18 1 10.09 1 10c0-.55.45-1 1-1h4.79l4.38-6.55a.997.997 0 0 1 1.66-.01L17.21 9H22c.55 0 1 .45 1 1l-.03.27l-.97 3.54c-.57-.31-1.21-.57-1.88-.7L20.7 11H3.31l2.19 8H13c0 .7.13 1.37.35 2M9.2 9h5.6L12 4.8L9.2 9Z"
      ></path>
    </svg>
  );
};

export default FoodItem;
