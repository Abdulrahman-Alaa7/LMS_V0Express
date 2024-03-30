"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../styles/style";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch?: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invaild email")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(8),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);

  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      toast.success("Login successfully");
      refetch();
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className={`w-full relative`}>
      <div
        className={`absolute right-0 top-0 bg-[#9e9e9e29] mx-auto p-1 rounded-full transition hover:opacity-[0.8]`}
      >
        <MdClose
          size={30}
          className={`text-black dark:text-white cursor-pointer `}
          onClick={() => setOpen(false)}
        />
      </div>
      <br />
      <br />
      <h1 className={`${styles.title} font-bold `}>
        Login To <span className={`${styles.textGradient}`}>ELearning</span>
      </h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="relative email-input">
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder=""
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.SpInput
            }`}
          />
          <label htmlFor="email" className={`${styles.SpLabel}`}>
            Enter your email
          </label>
        </div>

        {errors.email && touched.email && (
          <span className={`text-red-500 pt-2 block`}>{errors.email}</span>
        )}

        <div className="relative password-input w-full mt-5  mb-1">
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder=""
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.SpInput}`}
          />
          <label htmlFor="password" className={`${styles.SpLabel} `}>
            Enter your password
          </label>
          {!show ? (
            <AiOutlineEyeInvisible
              size={30}
              onClick={() => setShow(true)}
              className={`absolute bottom-3 right-2 z-1 cursor-pointer  text-black dark:text-white ${styles.BgHover} !p-1`}
            />
          ) : (
            <AiOutlineEye
              size={30}
              onClick={() => setShow(false)}
              className={`absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white ${styles.BgHover} !p-1`}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className={`text-red-500 pt-2 block`}>{errors.password}</span>
        )}
        <div className={`w-full mt-5`}>
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default Login;
