import { Link, useNavigate } from "react-router-dom";
import hamburgerImage from "./../../assets/hamburger.png";
import { useDispatch, useSelector } from "react-redux";
import { popAsync, uiActions } from "../../store/ui-slice";

const Intro = () => {
  return (
    <section
      id="intro"
      className="flex min-h-fit flex-col items-center justify-center bg-for py-10 text-back shadow-2xl md:flex-row md:space-x-10"
    >
      <div className="flex max-w-md flex-col items-center md:items-start">
        <Texts />
        <Buttons />
      </div>
      <Image />
    </section>
  );
};

const Texts = () => {
  const mainText = (
    <>
      A Chef In Every
      <span className="animate-colorize font-bold"> Tasty </span>
      Meal Box
    </>
  );
  const subText = (
    <>
      All our meals are cooked with high quality ingredients, just-in-time and
      of course by experienced chefs!
    </>
  );

  return (
    <div className="flex-col items-center justify-center px-2 md:px-0">
      <h1 className="mb-8 text-center text-3xl leading-tight tracking-tight md:text-left md:text-4xl lg:text-6xl">
        {mainText}
      </h1>
      <p className="mb-9 text-center text-sm md:text-left md:text-base lg:text-lg">
        {subText}
      </p>
    </div>
  );
};

const Buttons = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  // use navigate and replace links with button
  const navigate = useNavigate();

  const accountBtnHandler = () => {
    if (isLoggedIn) {
      dispatch(
        uiActions.putNewAlert({
          status: "info",
          message: "you already have logged in, refresh the page for logging out",
        })
      );
      dispatch(popAsync(5000));
      return;
    }
    navigate("/signup");
  };

  return (
    <div className="flex flex-row items-center justify-start space-x-3 whitespace-nowrap text-sm md:space-x-4 md:text-base">
      <button
        onClick={accountBtnHandler}
        className="rounded-xl bg-orange-600 px-9 py-2 transition duration-300 hover:bg-orange-400"
      >
        Sign Up
      </button>
      <Link
        to="/menu"
        className="rounded-xl border border-back px-7 py-2 transition duration-300  hover:border-orange-600 hover:text-orange-500"
      >
        View Menu
      </Link>
    </div>
  );
};

const Image = () => {
  return (
    <div className="absolute w-1/2 opacity-10 md:static md:w-4/12 md:opacity-95">
      <img
        className="animate-trigger overflow-hidden object-contain"
        src={hamburgerImage}
        alt="Hamburger"
      />
    </div>
  );
};

export default Intro;
