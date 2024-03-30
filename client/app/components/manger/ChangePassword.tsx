"use client";
import React, { FC, useEffect, useState } from "react";
import { styles } from "../../styles/style";
import { useChangePasswordMutation } from "../../../redux/features/users/userApi";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  user: any;
};

const ChangePassword: FC<Props> = ({ user }) => {
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isSuccess, error }] = useChangePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password do not match");
    } else if (oldPassword == newPassword) {
      toast.error("Please enter new password");
    } else {
      await changePassword({
        oldPassword,
        newPassword,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className={`w-full pl-7 px-2 800px:px-5 800px:pl-0`}>
      <h1
        className={`block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-white pb-2`}
      >
        Change Password
      </h1>
      <div className={`w-full`}>
        <form
          className={`flex items-center flex-col`}
          onSubmit={passwordChangeHandler}
        >
          <div className="w-[100%] 800px:w-[60%] mt-5 relative">
            <input
              type={!showOne ? "password" : "text"}
              name="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              id="oldpassword"
              placeholder=""
              className={`!w-[95%] mb-1 800px:mb-0 ${styles.SpInput}`}
            />
            <label htmlFor="password" className={`${styles.SpLabel} `}>
              Enter your old password
            </label>
            {!showOne ? (
              <AiOutlineEyeInvisible
                size={30}
                onClick={() => setShowOne(true)}
                className={`absolute bottom-3 400px:right-9 800px:right-6 1000px:right-9 1100px:right-12  right-5 z-1 cursor-pointer  text-black dark:text-white ${styles.BgHover} !p-1`}
              />
            ) : (
              <AiOutlineEye
                size={30}
                onClick={() => setShowOne(false)}
                className={`absolute bottom-3 400px:right-9 800px:right-6 1000px:right-9 1100px:right-12  right-5 z-1 cursor-pointer text-black dark:text-white ${styles.BgHover} !p-1`}
              />
            )}
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-5 relative">
            <input
              type={!showTwo ? "password" : "text"}
              name="newpasswordOne"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="newpasswordOne"
              placeholder=""
              className={`!w-[95%] mb-1 800px:mb-0 ${styles.SpInput}`}
            />
            <label htmlFor="newpasswordOne" className={`${styles.SpLabel} `}>
              Enter your new password
            </label>
            {!showTwo ? (
              <AiOutlineEyeInvisible
                size={30}
                onClick={() => setShowTwo(true)}
                className={`absolute bottom-3 400px:right-9 800px:right-6 1000px:right-9 1100px:right-12  right-5 z-1 cursor-pointer  text-black dark:text-white ${styles.BgHover} !p-1`}
              />
            ) : (
              <AiOutlineEye
                size={30}
                onClick={() => setShowTwo(false)}
                className={`absolute bottom-3 400px:right-9 800px:right-6 1000px:right-9 1100px:right-12  right-5 z-1 cursor-pointer text-black dark:text-white ${styles.BgHover} !p-1`}
              />
            )}
          </div>
          <div className={`w-[100%] 800px:w-[60%] mt-5 relative`}>
            <input
              type={!showTwo ? "password" : "text"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              placeholder=""
              className={`!w-[95%] mb-1 800px:mb-0 ${styles.SpInput}`}
            />
            <label htmlFor="confirmPassword" className={`${styles.SpLabel} `}>
              Enter your confirm password
            </label>
          </div>
          <br />
          <div className="w-[100%] 800px:w-[60%] mt-3 relative">
            <input
              type="submit"
              value="Change password"
              required
              className={`${styles.button} !w-[95%] 800px:!w-[95%]`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
