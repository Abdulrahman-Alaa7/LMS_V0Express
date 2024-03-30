"use client";
import React, { FC, useState, useEffect } from "react";
import { ThemeToggle } from "../../../utils/theme-toggle";
import { useLoadUserQuery } from "../../../../redux/features/api/apiSlice";
import Image from "next/image";
import Link from "next/link";
import { styles } from "../../../styles/style";
import avatar from "../../../../public/assets/avatar.png";
import SidebarProfileStudent from "../../Sidebars/SidebarProfileStudent";

type Props = {
  data: any;
  params: any;
  isExercise?: boolean;
};

const CourseHeader: FC<Props> = ({ data, params, isExercise }) => {
  const [activeHeader, setActiveHeader] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});

  const [openSidebar, setOpenSidebar] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActiveHeader(true);
      } else {
        setActiveHeader(false);
      }
    });
  }

  const handleDrawerOpen = () => {
    setOpenSidebar(true);
  };

  return (
    <div className={`w-full relative z-50 items-center`}>
      <div
        className={`${
          activeHeader
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 bg-white dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80px] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80px] dark:shadow"
        }`}
      >
        {openSidebar && (
          <>
            <SidebarProfileStudent
              user={userData?.user}
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
            />
          </>
        )}
        <div className="w-[95%] 800px:w-[92%] m-auto py-1 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              {isExercise ? (
                <Link
                  href={`/course-access/exercise/${params.id}`}
                  className={`text-[25px] font-Poppins font-[500] ${styles.textGradient} ml-8`}
                >
                  {data?.course?.courseTitle} {isExercise && "Exercises"}
                </Link>
              ) : (
                <Link
                  href={`/course-access/${params.id}`}
                  className={`text-[25px] font-Poppins font-[500] ${styles.textGradient} ml-8`}
                >
                  {data?.course?.courseTitle} {isExercise && "Exercises"}
                </Link>
              )}
            </div>
            <div className={`flex items-center `}>
              <ThemeToggle />
              <button type="button" onClick={handleDrawerOpen}>
                <Image
                  src={
                    userData?.user?.avatar || avatar
                      ? userData?.user?.avatar?.url || avatar
                      : avatar
                  }
                  alt=""
                  className={`w-[30px] h-[30px] rounded-full cursor-pointer mx-2`}
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
