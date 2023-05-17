import { useHref } from "react-router-dom";
import SignIn from "../account/SignIn";
import SignUp from "../account/SignUp";

const LoginPage = () => {
  const currentURL = useHref();
  return (
    <div className="">
      {currentURL === "/signup" ? <SignUp /> : <SignIn />}
    </div>
  );
};

export default LoginPage;
