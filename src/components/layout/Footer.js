import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { popAsync, uiActions } from "../../store/ui-slice";

const Footer = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  // use navigate and replace links with button
  const navigate = useNavigate();

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
    // change a value and show cart button
  };
  const accountBtnHandler = () => {
    if (isLoggedIn) {
      dispatch(
        uiActions.putNewAlert({
          status: "info",
          message:
            "you already have logged in, refresh the page for logging out",
        })
      );
      dispatch(popAsync(5000));
      return;
    }
    navigate("/signup");
  };

  return (
    <footer
      id="footer"
      className="inset-x-0 bottom-0 flex justify-around bg-for p-10"
    >
      <div className="flex flex-col space-y-5">
        <h3 className="text-lg text-back">Sections of the website</h3>
        <ul className="text-base children:list-inside children:list-disc children:text-back children:children:transition hover:children:children:text-slate-500">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/service">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
          <li>
            <Link to="/menu/search">Search</Link>
          </li>
          <li>
            <button onClick={cartBtnHandler}>Cart</button>
          </li>
          <li>
            <button onClick={accountBtnHandler}>Sign Up</button>
          </li>
        </ul>
      </div>
      <p className="self-end text-center text-sm text-back">
        This Website has made by Parsa Chavoshi
      </p>
    </footer>
  );
};

export default Footer;
