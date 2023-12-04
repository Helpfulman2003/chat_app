import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { loginRoute} from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { data } = await axios.post(loginRoute, values);
      if (data.success) {
        dispatch(updateUser(data.user))
        if(data.user?.isAvatarImageSet) {
          navigate('/')
        }else {
          navigate("/setAvatar")
        }
      } else {
        toast.error(data.message, toastOptions);
      }
    },
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center gap-[1rem] items-center bg-[#131324]">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-8 bg-[#00000076] rounded-[2rem] px-20 py-12"
        >
          <div className="flex items-center gap-4 justify-center">
            <img src={Logo} alt="" className="h-[5rem]" />
            <h1 className="text-slate-100 uppercase">Helpfulman</h1>
          </div>
          <input
            type="text"
            className="bg-transparent p-4 border-solid border-[#4e0eff] border-[1px] rounded-md text-white text-[1rem] focus:border-solid focus:border-[#997af0] focus:border focus:outline-none"
            placeholder="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <input
            type="password"
            className="bg-transparent p-4 border-solid border-[#4e0eff] border-[1px] rounded-md text-white text-[1rem] focus:border-solid focus:border-[#997af0] focus:border focus:outline-none"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <button
            type="submit"
            className="bg-[#997af0] text-white px-8 py-4 font-bold cursor-pointer text-[1rem] uppercase hover:bg-[#4e0eff] transition-all duration-500 rounded-lg"
          >
            Submit
          </button>
          <span className="text-white">
            Don't have an account?
            <Link to="/register">
              <span className="text-[#4e0eff] font-bold">register</span>
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
};

export default Login;
