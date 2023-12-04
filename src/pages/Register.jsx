import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  //     const [values, setValues] = useState({
  //         username: "",
  //         email: "",
  //         password: "",
  //         confirmPassword: "",
  //     })

  //   const handleChange = (e) => {
  //     setValues({...values, [e.target.name]: e.target.value})
  //   };
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Required")
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters"),
      email: Yup.string()
        .required("Required")
        .email("Invalid email format")
        .required("Required!")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password")], "Password's not match"),
    }),
    onSubmit: async (values) => {
      const { data } = await axios.post(registerRoute, values);
      if (data.success) {
        navigate('/')
      }else {
        toast.error(data.message, toastOptions)
      }
    },
  });

  const toastOptions =  {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    }

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
          {formik.errors.username && formik.touched.username && (
            <p className="text-red-600">{formik.errors.username}</p>
          )}
          <input
            type="email"
            className="bg-transparent p-4 border-solid border-[#4e0eff] border-[1px] rounded-md text-white text-[1rem] focus:border-solid focus:border-[#997af0] focus:border focus:outline-none"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600">{formik.errors.email}</p>
          )}
          <input
            type="password"
            className="bg-transparent p-4 border-solid border-[#4e0eff] border-[1px] rounded-md text-white text-[1rem] focus:border-solid focus:border-[#997af0] focus:border focus:outline-none"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600">{formik.errors.password}</p>
          )}
          <input
            type="password"
            className="bg-transparent p-4 border-solid border-[#4e0eff] border-[1px] rounded-md text-white text-[1rem] focus:border-solid focus:border-[#997af0] focus:border focus:outline-none"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="text-red-600">{formik.errors.confirmPassword}</p>
          )}
          <button
            type="submit"
            className="bg-[#997af0] text-white px-8 py-4 font-bold cursor-pointer text-[1rem] uppercase hover:bg-[#4e0eff] transition-all duration-500 rounded-lg"
          >
            Submit
          </button>
          <span className="text-white">
            already have an account?
            <Link to="/login">
              <span className="text-[#4e0eff] font-bold">Login</span>
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

export default Register;
