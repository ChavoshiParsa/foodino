import {
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import FoodList from "./FoodList";
import { useState } from "react";
import { BackIcon } from "../account/SignUp";
import { useSelector } from "react-redux";

const Menu = () => {
  const foodData = useSelector((state) => state.foodData.items);

  const params = useParams();
  let pType = Object.values(params)[0];

  const [searchedFoodData, setSearchedFoodData] = useState(foodData);

  const filteredFoodData = foodData.filter((item) => {
    if (pType === "all") return true;
    else return item.type === pType;
  });

  const searchChangeHandler = (event) => {
    setSearchedFoodData(
      foodData.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const types = (
    <ul className="grid grid-cols-2 justify-items-center gap-2 align-middle sm:grid-cols-4">
      <ListItem name={"All Meals"} path="all">
        <AllMealsIcon size={2.5} color={"#111"} />
      </ListItem>
      <ListItem name={"Hot Meals"} path="foods">
        <HotMealsIcon size={2.5} color={"#111"} />
      </ListItem>
      <ListItem name={"Salads"} path="salads">
        <SaladsIcon size={2.5} color={"#111"} />
      </ListItem>
      <ListItem name={"Drinks"} path="drinks">
        <DrinksIcon size={2.5} color={"#111"} />
      </ListItem>
    </ul>
  );

  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("/menu");
  };
  const backButton = (
    <div
      className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 hover:cursor-pointer hover:bg-orange-400"
      onClick={goBackHandler}
    >
      <BackIcon size={1.7} color={"rgb(245 249 255)"} />
    </div>
  );

  const searchField = (
    <input
      placeholder="Search..."
      className="rounded-xl border-2 border-orange-400 bg-slate-100 p-2 pr-20 pl-4 font-mono text-lg font-bold focus:bg-white focus:outline-none"
      onChange={searchChangeHandler}
    />
  );

  return (
    <section id="menu" className="mt-5">
      <div className="relative flex items-center justify-center">
        {pType !== "search" && types}
        {pType === "search" && backButton}
        {pType === "search" && searchField}
      </div>
      <div className="mt-14 flex items-center justify-center">
        <div className="grid grid-cols-1 justify-items-center gap-14 align-middle sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <Routes>
            <Route
              path=":type"
              element={
                <FoodList
                  data={
                    pType === "search" ? searchedFoodData : filteredFoodData
                  }
                />
              }
            />
          </Routes>
        </div>
      </div>
    </section>
  );
};

const ListItem = (props) => {
  return (
    <li>
      <NavLink
        to={props.path}
        className={(navData) =>
          "flex h-32 w-28 flex-col items-center justify-center space-y-3 rounded-2xl text-back transition duration-300  " +
          (navData.isActive ? "menuActive" : "menuNotActive")
        }
      >
        <div className="rounded-full bg-back p-1">{props.children}</div>
        <span className=" text-lg">{props.name}</span>
      </NavLink>
    </li>
  );
};

const AllMealsIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size + "em"}
      height={props.size + "em"}
      viewBox="0 0 256 256"
    >
      <path
        fill={props.color}
        d="M72 88V40a8 8 0 0 1 16 0v48a8 8 0 0 1-16 0Zm144-48v184a8 8 0 0 1-16 0v-48h-48a8 8 0 0 1-8-8a268.75 268.75 0 0 1 7.22-56.88c9.78-40.49 28.32-67.63 53.63-78.47A8 8 0 0 1 216 40Zm-16 13.9c-32.17 24.57-38.47 84.42-39.7 106.1H200Zm-80.11-15.21a8 8 0 1 0-15.78 2.63L112 88.63a32 32 0 0 1-64 0l7.88-47.31a8 8 0 1 0-15.78-2.63l-8 48A8.17 8.17 0 0 0 32 88a48.07 48.07 0 0 0 40 47.32V224a8 8 0 0 0 16 0v-88.68A48.07 48.07 0 0 0 128 88a8.17 8.17 0 0 0-.11-1.31Z"
      ></path>
    </svg>
  );
};

const HotMealsIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size + "em"}
      height={props.size + "em"}
      viewBox="0 0 48 48"
    >
      <g fill={props.color}>
        <path d="m24 10.5l-.895-.447v.003l-.003.004l-.006.013l-.021.043a10.61 10.61 0 0 0-.29.681a10.96 10.96 0 0 0-.516 1.757c-.264 1.321-.351 3.278 1.024 4.653c.625.625.712 1.668.476 2.847a8.972 8.972 0 0 1-.65 1.971l-.012.025l-.002.003l.895.447c.894.447.895.446.895.446v-.002l.003-.004l.006-.013l.021-.043l.07-.15a10.96 10.96 0 0 0 .736-2.287c.264-1.322.351-3.279-1.024-4.654c-.625-.625-.712-1.668-.476-2.847a8.972 8.972 0 0 1 .65-1.971l.012-.025l.002-.003L24 10.5Z"></path>
        <path
          fillRule="evenodd"
          d="M4 29a1 1 0 0 1 1-1h38a1 1 0 1 1 0 2h-3a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8H5a1 1 0 0 1-1-1Zm6 1h28a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6Z"
          clipRule="evenodd"
        ></path>
        <path d="m15.17 12.441l.83.56c.829.559.83.558.83.558l-.013.02a6.128 6.128 0 0 0-.246.43a5.79 5.79 0 0 0-.45 1.127c-.24.892-.154 1.596.474 2.06c1.622 1.202 1.536 2.999 1.214 4.19a7.783 7.783 0 0 1-.605 1.528a8.037 8.037 0 0 1-.338.588l-.02.032l-.005.007l-.008.012l-.002.004l-.001.001s-.001.002-.83-.558s-.83-.559-.83-.559l.013-.019l.054-.086a6.82 6.82 0 0 0 .192-.344c.155-.298.333-.698.45-1.128c.24-.892.154-1.595-.474-2.06c-1.622-1.202-1.536-2.998-1.214-4.19c.165-.612.409-1.15.605-1.528a8.108 8.108 0 0 1 .363-.626l.007-.012l.003-.005l.002-.002ZM33 13c-.829-.56-.83-.559-.83-.559v.002l-.004.005l-.008.012a6.492 6.492 0 0 0-.362.626c-.196.378-.44.916-.605 1.528c-.322 1.191-.408 2.988 1.214 4.19c.628.465.714 1.168.473 2.06c-.116.43-.294.83-.45 1.128a6.018 6.018 0 0 1-.245.43l-.012.02L33 23c.829.56.83.558.83.558v-.001l.004-.004l.008-.012l.015-.025l.01-.014a8.037 8.037 0 0 0 .338-.588a7.85 7.85 0 0 0 .604-1.528c.322-1.191.408-2.988-1.214-4.19c-.628-.465-.714-1.168-.473-2.06c.116-.43.294-.83.45-1.128a6.128 6.128 0 0 1 .245-.43l.012-.019L33 13Z"></path>
      </g>
    </svg>
  );
};

const SaladsIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size + "em"}
      height={props.size + "em"}
      viewBox="0 0 20 20"
    >
      <path
        fill={props.color}
        d="M6.923 4.833a3.5 3.5 0 0 1 6.242.168a3.751 3.751 0 0 0-3.383 2.321a6.15 6.15 0 0 0-.913-1.173a6.506 6.506 0 0 0-1.946-1.316ZM16.992 9a3.752 3.752 0 0 0-2.697-3.853a4.502 4.502 0 0 0-8.314-.67a10.072 10.072 0 0 0-1.213-.296A11.462 11.462 0 0 0 2.666 4a6.399 6.399 0 0 0-.184.006h-.004a.501.501 0 0 0-.47.47v.001a9.51 9.51 0 0 0-.001.673c.013.409.056.977.172 1.619c.123.682.331 1.464.685 2.23H2.5a.5.5 0 0 0-.5.5v.5a8 8 0 1 0 16 0v-.5a.5.5 0 0 0-.5-.5h-.508ZM3.984 9c-.434-.782-.682-1.639-.82-2.408a10.467 10.467 0 0 1-.162-1.59l.114.004c.372.013.89.053 1.474.159c1.18.213 2.566.685 3.572 1.691c.616.616 1.033 1.376 1.313 2.144H7.708L5.854 7.146a.5.5 0 1 0-.707.708L6.294 9h-2.31Zm6.548 0a6.859 6.859 0 0 0-.027-.081A2.75 2.75 0 1 1 15.99 9h-5.457ZM3 10h14c0 .695-.101 1.366-.29 2H3.29A7.001 7.001 0 0 1 3 10Zm7 7a7 7 0 0 1-6.326-4h12.652A7 7 0 0 1 10 17Z"
      ></path>
    </svg>
  );
};

const DrinksIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size + "em"}
      height={props.size + "em"}
      viewBox="0 0 24 24"
    >
      <path
        d="M15.72 2.22a.75.75 0 0 1 1.06 1.06L15.56 4.5h2.19c.317 0 .6.2.706.498l1.25 3.5A.75.75 0 0 1 19 9.5h-1.045l-1.587 10.05c-.21 1.465-1.46 2.45-2.97 2.45h-2.796c-1.51 0-2.76-.986-2.968-2.44L6.044 9.5H5a.75.75 0 0 1-.706-1.002l1.25-3.5A.75.75 0 0 1 6.25 4.5h7.188l2.282-2.28zm.716 7.28H7.562l1.555 9.837c.1.695.692 1.163 1.485 1.163h2.796c.793 0 1.386-.468 1.487-1.174L16.436 9.5zm.785-3.5H6.78l-.715 2h11.872l-.715-2z"
        fill={props.color}
        fillRule="nonzero"
      ></path>
    </svg>
  );
};

export default Menu;
