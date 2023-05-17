import CartItem from "./CartItem";

const CartList = (props) => {
  const items = props.items;
  const isCartEmpty = items.length === 0;

  return (
    <div className="h-48 md:h-60 w-72 md:w-[30rem] divide-y-2 divide-amber-800 overflow-y-auto overscroll-none ">
      {isCartEmpty && (
        <h3 className="md:mt-24 mt-20 w-full text-center text-3xl md:text-5xl text-orange-800">
          The cart is Empty
        </h3>
      )}
      {!isCartEmpty &&
        items.map((item) => (
          <CartItem
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            key={item.id}
          />
        ))}
    </div>
  );
};

export default CartList;
