import FoodItem from "./FoodItem";
import { imp } from "../home/ChosenMenu";

const FoodList = (props) => {
  return props.data.map((item) => (
    <FoodItem
      id={"i" + item.id}
      name={item.name}
      price={item.price}
      rate={item.rate}
      src={imp(item.name)}
      alt={item.name}
      key={"k" + item.id}

    />
  ));
};

export default FoodList;
