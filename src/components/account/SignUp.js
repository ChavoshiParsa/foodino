import { useNavigate } from "react-router-dom";
import table from "./../../assets/signup.jpg";
import { useState } from "react";
import { accountActions } from "../../store/account-slice";
import { useDispatch } from "react-redux";
import { popAsync, uiActions } from "../../store/ui-slice";
import { API_KEY } from "../../App";
import { cartActions } from "../../store/cart-slice";
import { sendCartData } from "../../store/http-request";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
// ✦

// ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
// "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"

const SignUp = () => {
  const dispatch = useDispatch();

  // validation must be happen {maybe with formik library}
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .trim()
        .min(3, "Full name must be at least 3 characters long")
        .max(15, "Must be 15 characters or less")
        .required("Full name is required"),
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .trim()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(uiActions.setLoading(true));
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
          {
            email: values.email,
            password: values.password,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          dispatch(uiActions.setLoading(false));
          dispatch(
            uiActions.putNewAlert({
              status: "success",
              message: "your information register successfully",
            })
          );
          dispatch(popAsync(5000));
          navigate("/menu");
          return res.data;
        })
        .then((data) => {
          const info = {
            email: values.email,
            password: values.password,
            userUID: data.localId,
          };
          dispatch(accountActions.loggingIn(info));
          dispatch(cartActions.setName(values.fullName));
          dispatch(
            sendCartData({
              username: data.localId,
              name: values.fullName,
              isAnythingBought: false,
              totalAmount: 0,
              totalPrice: 0,
              items: [],
            })
          );
        })
        .catch((err) => {
          dispatch(uiActions.setLoading(false));
          dispatch(
            uiActions.putNewAlert({
              status: "error",
              message: err.response.data.error.message,
            })
          );
          dispatch(popAsync(5000));
        });
    },
  });

  const [transitionClass, setTransitionClass] = useState({ form: "", img: "" });
  const navigate = useNavigate();

  const formClassHandler = () => {
    setTransitionClass({
      form: "translate-x-[35rem] opacity-0",
      img: "-translate-x-[35rem] opacity-0",
    });
    setTimeout(() => {
      navigate("/signin");
    }, 700);
  };

  const goBackHandler = () => {
    navigate("/menu");
  };

  return (
    <div className="relative mx-auto mt-8 flex h-auto w-5/6 flex-col-reverse justify-between rounded-3xl bg-slate-200 lg:flex-row">
      <div
        className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 hover:cursor-pointer hover:bg-orange-400"
        onClick={goBackHandler}
      >
        <BackIcon size={1.8} color={"rgb(245 249 255)"} />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className={`mx-[10%] my-20 flex flex-col items-center justify-center whitespace-nowrap font-pop transition duration-700 md:mx-[25%] lg:mx-[13%] ${transitionClass.form}`}
      >
        <h1 className="self-center text-2xl text-for md:text-3xl lg:text-4xl">
          Create an account
        </h1>
        <p className="mb-16 self-center text-base text-slate-500 lg:text-lg">
          %50 off for first order
        </p>
        <Input
          name="fullName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName.trim()}
          label={"Full Name"}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div className="-mt-3 mb-2 text-xs text-rose-500 md:-mt-5">
            {formik.errors.fullName}
          </div>
        )}
        <Input
          name="email"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email.trim()}
          label={"Email"}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="-mt-3 mb-2 text-xs text-rose-500 md:-mt-5">
            {formik.errors.email}
          </div>
        )}
        <Input
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password.trim()}
          label={"Password"}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="-mt-3 mb-1 text-xs text-rose-500 md:-mt-5">
            {formik.errors.password}
          </div>
        )}
        <button
          className="mb-10 w-full rounded-lg bg-for py-2 text-center text-back"
          type="submit"
        >
          Sign Up
        </button>
        <h5 className="text-sm text-slate-400">
          Already have an account?{" "}
          <button
            className="bg-transparent font-bold text-sky-600 underline underline-offset-2 transition hover:text-for"
            onClick={formClassHandler}
            type="button"
          >
            Sign In
          </button>
        </h5>
      </form>
      <img
        className={`hidden overflow-hidden rounded-r-3xl object-cover transition duration-700 lg:block ${transitionClass.img}`}
        src={table}
        alt="a table full of food"
      />
    </div>
  );
};

const Input = (props) => {
  return (
    <div className="relative mb-3 flex w-full flex-col items-center justify-center md:mb-6">
      <input
        className="peer w-full rounded-lg border border-slate-500 bg-transparent p-2.5 text-[1em] text-for outline-0"
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        required
      />
      <span
        className="pointer-events-none absolute left-0 p-2.5 text-sm text-slate-500 transition duration-200
        peer-valid:translate-x-2.5 peer-valid:-translate-y-6 peer-valid:bg-slate-200 peer-valid:py-0 peer-valid:px-2.5 peer-valid:text-[0.65em] peer-valid:text-sky-500
        peer-focus:translate-x-2.5 peer-focus:-translate-y-6 peer-focus:bg-slate-200 peer-focus:py-0 peer-focus:px-2.5 peer-focus:text-[0.65em] peer-focus:text-sky-500"
      >
        {props.label}
      </span>
    </div>
  );
};

export const BackIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${props.size}em`}
      height={`${props.size}em`}
      viewBox="0 0 24 24"
    >
      <path
        fill={props.color}
        d="M12 9.059V6.5a1.001 1.001 0 0 0-1.707-.708L4 12l6.293 6.207a.997.997 0 0 0 1.414 0A.999.999 0 0 0 12 17.5v-2.489c2.75.068 5.755.566 8 3.989v-1c0-4.633-3.5-8.443-8-8.941z"
      ></path>
    </svg>
  );
};

export default SignUp;
