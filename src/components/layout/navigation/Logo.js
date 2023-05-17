// import logo from "./../../../assets/logo.png";

import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/home">
      <h1 className="font-dance text-4xl font-bold text-for">
        F<span className="font-dance text-orange-500">OO</span>DINO
      </h1>
    </Link>
  );
};

export default Logo;

/*<img
      className="-my-9 h-24 w-24 object-cover invert self-end"
      src={logo}
      alt="Logo"
    />*/
