import { Link, useNavigate } from "react-router-dom";
import table from "./../../assets/signup.jpg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { popAsync, uiActions } from "../../store/ui-slice";
import { accountActions } from "../../store/account-slice";
import { API_KEY } from "../../App";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Enter your Email"),
      password: Yup.string()
        .trim()
        .min(6, "Password must be at least 6 characters long")
        .required("Enter your password"),
    }),
    onSubmit: (values) => {
      dispatch(uiActions.setLoading(true));
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
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
              message: "you logged in successfully",
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
      form: "-translate-x-[35rem] opacity-0",
      img: "translate-x-[35rem] opacity-0",
    });
    setTimeout(() => {
      navigate("/signup");
    }, 700);
  };

  return (
    <div className="relative mx-auto mt-8 flex h-auto w-5/6 flex-col justify-between rounded-3xl bg-slate-200 lg:flex-row-reverse">
      <form
        onSubmit={formik.handleSubmit}
        className={`mx-[10%] my-20 flex flex-col items-center justify-center whitespace-nowrap font-pop transition duration-700 md:mx-[25%] lg:mx-[13%] ${transitionClass.form}`}
      >
        <h1 className="mb-14 self-center text-2xl text-for md:text-3xl lg:text-4xl">
          Welcome back sir
        </h1>
        <Input
          name="email"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
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
          value={formik.values.password}
          label={"Password"}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="-mt-3 mb-1 text-xs text-rose-500 md:-mt-5">
            {formik.errors.password}
          </div>
        )}
        <button
          type="submit"
          className="mb-10 w-full rounded-lg bg-for py-2 text-center text-back"
        >
          Sign In
        </button>
        <div className="flex flex-col items-center justify-between space-y-4">
          <h5 className="text-sm text-slate-400">
            Don’t have an account?{" "}
            <button
              className="bg-transparent font-bold text-sky-600 underline underline-offset-2 transition hover:text-for"
              onClick={formClassHandler}
              type="button"
            >
              Sign Up
            </button>
          </h5>
          <h5 className="text-xs text-slate-500 underline underline-offset-2 transition hover:text-for ">
            <Link to="" onClick={() => {}}>
              Forget Password?
            </Link>
          </h5>
        </div>
      </form>
      <img
        className={`hidden overflow-hidden rounded-l-3xl object-cover transition duration-700 lg:block ${transitionClass.img}`}
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

export default SignIn;
