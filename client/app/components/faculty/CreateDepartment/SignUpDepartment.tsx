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
import { useRegisterDepartmentMutation } from "../../../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import CustomModal from "../../../utils/CustomModal";
import { LiaUniversitySolid } from "react-icons/lia";
import VerificationDepartment from "./VerificationDepartment";
import { useLoadUserQuery } from "../../../../redux/features/api/apiSlice";
import { FaSchoolFlag } from "react-icons/fa6";

type Props = {};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter a name"),
  email: Yup.string().email("Invaild email").required("Please enter an email"),
  password: Yup.string().required("Please enter a password").min(8),
  yearsOfStudy: Yup.number().required(
    "Please enter the number of years of study"
  ),
});

const SignUpDepartment: FC<Props> = ({}) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] =
    useRegisterDepartmentMutation();
  const [route, setRoute] = useState("Sign-Up");
  const [open, setOpen] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const userId = userData?.user._id;
  const userCreatedById = userId;

  const universityName = userData?.user?.universityName;
  const facultyName = userData?.user?.name;
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
    initialValues: { name: "", email: "", password: "", yearsOfStudy: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password, yearsOfStudy }) => {
      const data = {
        name,
        email,
        password,
        userCreatedById,
        universityName,
        facultyName,
        yearsOfStudy,
      };

      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className={`w-full`}>
      <h1 className={`${styles.title}`}>
        <div className={`flex justify-center items-center`}>
          <FaSchoolFlag size={40} />
        </div>
        Craete a new department
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
            Department name
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
              Department email
            </label>
          </div>

          {errors.email && touched.email && (
            <span className={`text-red-500 pt-2 block`}>{errors.email}</span>
          )}
        </div>

        <div className="relative mt-5 name-input mb-2">
          <input
            type="number"
            name="yearsOfStudy"
            value={values.yearsOfStudy}
            onChange={handleChange}
            id="yearsOfStudy"
            placeholder=""
            className={`${
              errors.yearsOfStudy && touched.yearsOfStudy && "border-red-500"
            } ${styles.SpInput}`}
          />
          <label htmlFor="yearsOfStudy" className={`${styles.SpLabel}`}>
            Years of study
          </label>
        </div>

        {errors.yearsOfStudy && touched.yearsOfStudy && (
          <span className={`text-red-500 pt-2 block`}>
            {errors.yearsOfStudy}
          </span>
        )}

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
              Department password
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
          <input type="submit" value="Create" className={`${styles.button}`} />
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
              component={VerificationDepartment}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SignUpDepartment;
