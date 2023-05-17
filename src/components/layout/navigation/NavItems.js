import { NavLink, useNavigate } from "react-router-dom";
import { AccountIcon, CartIcon, SearchIcon } from "./SCA";
import { useDispatch, useSelector } from "react-redux";
import { popAsync, uiActions } from "../../../store/ui-slice";

const NavItems = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);
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
    dispatch(uiActions.showCart());
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
    <nav className={`${!props.isNavOpen && "hidden"} md:block`}>
      <ul
        onClick={props.navToggleHandler}
        className="list-non absolute top-9 right-6 flex flex-col items-start justify-between space-y-4 rounded-lg bg-[rgba(100,100,100,0.4)]
        py-5 px-6 backdrop-blur-md children:text-lg md:static md:flex-row 
        md:items-center md:space-y-0 md:space-x-12 md:rounded-none md:bg-transparent md:p-0 md:backdrop-blur-0 smm:left-6"
      >
        <li>
          <NavLink
            to="/home"
            className={(navData) =>
              navData.isActive ? "navActive" : "navNotActive"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/menu"
            className={(navData) =>
              navData.isActive ? "navActive" : "navNotActive"
            }
          >
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/service"
            className={(navData) =>
              navData.isActive ? "navActive" : "navNotActive"
            }
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={(navData) =>
              "whitespace-nowrap " +
              (navData.isActive ? "navActive" : "navNotActive")
            }
          >
            Contact us
          </NavLink>
        </li>
        <li className="flex items-center space-x-1 md:hidden">
          <NavLink
            to="/menu/search"
            className={(navData) =>
              navData.isActive ? "navActive" : "navNotActive"
            }
          >
            Search
          </NavLink>
          <SearchIcon color={"white"} size={1.1} />
        </li>
        <li className="flex items-center space-x-1 md:hidden">
          <button onClick={cartBtnHandler} className={"navNotActive"}>
            Cart
          </button>
          <CartIcon color={"white"} size={1.1} />
        </li>
        <li className="flex items-center space-x-1 md:hidden">
          <button onClick={accountBtnHandler} className={"navNotActive"}>
            Sign Up
          </button>
          <AccountIcon color={"white"} size={1.1} />
        </li>
      </ul>
    </nav>
  );
};

export default NavItems;
