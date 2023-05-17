import SCA from "./SCA";
import Logo from "./Logo";
import NavItems from "./NavItems";
import { useState } from "react";
import { useSelector } from "react-redux";
import { nickName } from "../../../App";

const Navigation = () => {
  const account = useSelector((state) => state.account);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const navToggleHandler = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header
      id="header"
      className="sticky top-0 z-10 flex items-center justify-between bg-[#fffbfbee] px-5 py-1.5 shadow-2xl"
    >
      <Logo />

      {account.isLoggedIn && (
        <h2 className="absolute top-12 left-4 text-base font-bold text-indigo-500 md:top-14 md:text-lg">
          {"Welcome " + (nickName || "Dear")}
        </h2>
      )}

      <NavItems isNavOpen={isNavOpen} navToggleHandler={navToggleHandler} />
      <SCA />
      <div className="mr-3 md:hidden" onClick={navToggleHandler}>
        {!isNavOpen ? <BarsIcon /> : <CloseIcon />}
      </div>
    </header>
  );
};

const BarsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.6em"
      height="1.6em"
      viewBox="0 0 24 24"
    >
      <path
        fill="#262626"
        d="M21 13H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zm0 5H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zm0-10H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z"
      ></path>
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.8em"
      height="1.8em"
      viewBox="0 0 24 24"
    >
      <path
        fill="#262626"
        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"
      ></path>
    </svg>
  );
};

export default Navigation;
