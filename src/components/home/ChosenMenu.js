import { Link } from "react-router-dom";
import FoodItem from "../menu/FoodItem";
import { foodData } from "../../assets/DummyData";

/*const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(
  require.context("./../../assets/Food-Images", false, /\.(png|jpe?g|svg)$/)
);

const OTA = (index) => {
  return Object.values(images)[index];
};

const OTP = (index) => {
  return Object.keys(images)[index];
};

const strLimiter = (str, numFromLast) => {
  return str.substring(0, str.length - numFromLast);
};*/

export const imp = (name) => require(`./../../assets/Food-Images/${name}.png`);

const ChosenMenu = () => {
  return (
    <section
      id="menu"
      className="mt-12 flex flex-col items-center justify-center space-y-7"
    >
      <h1 className="my-4 text-center text-2xl underline decoration-orange-500 underline-offset-[7px] md:text-3xl">
        Favorite Meals
      </h1>
      <div className="relative flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 gap-y-12 overflow-hidden p-10 pt-14 sm:grid-cols-2 sm:gap-6 md:gap-20 lg:grid-cols-3 2xl:grid-cols-4">
          {foodData.map((item) => (
            <FoodItem
              key={"k" + item.id}
              id={"i" + item.id}
              src={imp(item.name)}
              name={item.name}
              alt={item.name}
              rate={item.rate}
              price={item.price}
            />
          ))}
        </div>

        <Link
          to="/menu"
          className="rounded-lg bg-orange-400 px-3.5 py-1.5 text-center text-xl text-back hover:bg-orange-600"
        >
          Show All Menu
        </Link>
      </div>
    </section>
  );
};

export default ChosenMenu;
