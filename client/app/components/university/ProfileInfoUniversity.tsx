"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import avatarIcon from "../../../public/assets/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../../styles/style";
import {
  useEditProfileUniversityMutation,
  useUpdateAvatarUniversityMutation,
} from "../../../redux/features/users/userUniversityApi";
// import { useLoadUserUniversityQuery } from "../../redux/features/api/apiSlice";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import toast from "react-hot-toast";
type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfoUniversity: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatarUniversity, { isSuccess, error }] =
    useUpdateAvatarUniversityMutation();
  const [editProfileUniversity, { isSuccess: forSuccess, error: forError }] =
    useEditProfileUniversityMutation();
  const [loadUser, setLoadUser] = useState(false);
  const { refetch } = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatarUniversity(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
      toast.success("Photo Updated successfully");
    }
    if (forSuccess) {
      setLoadUser(true);
      toast.success("Name Updated successfully");
    }

    if (error || forError) {
      console.log(error);
    }
  }, [isSuccess, error, forSuccess, forError]);

  useEffect(() => {
    if (loadUser) {
      refetch();
    }
  }, [loadUser]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "" && name !== user.name) {
      await editProfileUniversity({
        name: name,
      });
    }
  };

  return (
    <>
      <div className={`w-full flex justify-center`}>
        <div className={`relative`}>
          <Image
            src={
              user?.avatar || avatar ? user.avatar.url || avatar : avatarIcon
            } //
            alt={user?.name}
            className={`w-[120px] h-[120px] rounded-full cursor-pointer border-[3px] border-[#0095f6]`}
            width={120}
            height={120}
          />
          <input
            type="file"
            name=""
            id="avatar"
            className={`hidden`}
            onChange={imageHandler}
            accept="image/png, image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div
              className={`w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer`}
            >
              <AiOutlineCamera size={20} className={`z-1 text-white`} />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className={`w-full pl-6 800px:pl-10`}>
        <form onSubmit={handleSubmit}>
          <div className={`800px:w-[50%] m-auto block pb-4`}>
            <div className={`w-[100%] relative mb-6`}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                className={`!w-[95%] mb-4 800px:mb-0 ${styles.SpInput}`}
                id="name-uni"
              />
              <label htmlFor="name-uni" className={`${styles.SpLabel} `}>
                University Name
              </label>
            </div>
            <div className={`w-[100%]  relative mb-6`}>
              <input
                type="text"
                value={user?.email}
                readOnly
                placeholder=""
                required
                className={`!w-[95%] mb-1 800px:mb-0 cursor-default ${styles.SpInput}`}
              />
              <label htmlFor="" className={`${styles.SpLabel} `}>
                University email
              </label>
            </div>
            <div className={`w-[100%]  relative mb-6`}>
              <input
                type="text"
                value={user?.role}
                readOnly
                required
                placeholder=""
                className={`!w-[95%] mb-1 800px:mb-0 cursor-default ${styles.SpInput}`}
              />
              <label htmlFor="" className={`${styles.SpLabel} `}>
                Role
              </label>
            </div>
            <div className={`w-full`}>
              <input
                type="submit"
                value="Update"
                required
                className={`${styles.button} !w-[95%]`}
              />
            </div>
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfoUniversity;
