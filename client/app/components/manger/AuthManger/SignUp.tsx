"use client";
import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../styles/style";
import { useRegisterMutation } from "../../../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import CustomModal from "../../../utils/CustomModal";
import Verification from "./Verification";
import { FaUserCog } from "react-icons/fa";

type Props = {
  refetch: any;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invaild email")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(8),
});

const SignUP: FC<Props> = ({ refetch }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();
  const [route, setRoute] = useState("Sign-Up");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setOpen(!open);
      setRoute("Verification");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = { name, email, password };

      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className={`w-full`}>
      <h1 className={`${styles.title}`}>
        <div className={`flex justify-center items-center`}>
          <FaUserCog size={40} />
        </div>
        Add new manger
      </h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="relative name-input mb-2">
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder=""
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.SpInput
            }`}
          />
          <label htmlFor="name" className={`${styles.SpLabel}`}>
            Manger name
          </label>
        </div>

        {errors.name && touched.name && (
          <span className={`text-red-500 pt-2 block`}>{errors.name}</span>
        )}
        <div className={`w-full mt-5 relative mb-2`}>
          <div className="relative email-input">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder=""
              className={`${
                errors.email && touched.email && "border-red-500"
              } ${styles.SpInput}`}
            />
            <label htmlFor="email" className={`${styles.SpLabel}`}>
              Manger email
            </label>
          </div>

          {errors.email && touched.email && (
            <span className={`text-red-500 pt-2 block`}>{errors.email}</span>
          )}
        </div>
        <div className={`w-full mt-5 relative mb-2`}>
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
              Manger password
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
        </div>
        {errors.password && touched.password && (
          <span className={`text-red-500 pt-2 block`}>{errors.password}</span>
        )}
        <div className={`w-full mt-10`}>
          <input type="submit" value="Sign up" className={`${styles.button}`} />
        </div>
        <br />
      </form>
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Verification}
              refetch={refetch}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SignUP;
