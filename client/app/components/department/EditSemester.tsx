"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import avatarIcon from "../../../public/assets/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../../styles/style";
import { IoIosArrowDown } from "react-icons/io";
import { useUpdateDepartmentSemesterMutation } from "../../../redux/features/users/userDepartmentApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import toast from "react-hot-toast";
import { MdOutlineEditCalendar } from "react-icons/md";

type Props = {};

const EditSemester: FC<Props> = () => {
  const { data: userData, refetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const user = userData?.user;

  const [semester, setSemester] = useState(user && user.semester);
  const [updateSemester, { isSuccess, error }] =
    useUpdateDepartmentSemesterMutation();
  const email = user?.email;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Semester updated successfully");
      refetch();
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (semester !== user?.semester && semester !== 0) {
      await updateSemester({
        email,
        semester,
      });
    }
  };

  return (
    <>
      <div className={`w-full flex items-center flex-col min-h-[90.9vh]`}>
        <h1
          className={`${styles.title} mt-12 flex items-center justify-center  gap-2`}
        >
          <span>
            <MdOutlineEditCalendar size={30} />
          </span>
          Edit semester
        </h1>
        <div>
          <h1
            className={`${styles.title} mt-3 flex items-center justify-center  gap-2`}
          >
            {user?.semester === 1 && "Semester One"}
            {user?.semester === 2 && "Semester Two"}
          </h1>
        </div>
        <div className={`mt-4 w-full 800px:!w-[50%] mx-auto relative px-2`}>
          <IoIosArrowDown size={20} className={`absolute right-4 top-4 `} />
          <select
            className={`${styles.SpInput} dark:bg-slate-900 font-Popins cursor-pointer `}
            onChange={(e: any) => setSemester(e.target.value)}
          >
            <option value="0">Change Semester</option>
            <option value="1">Semester one</option>
            <option value="2">Semester two</option>
          </select>
          <br />
          <div
            className={`${styles.button} my-6 !h-[30px]`}
            onClick={handleSubmit}
          >
            Update
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default EditSemester;
