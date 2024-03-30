"use client";
import React, { FC, useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { BiSolidBookContent } from "react-icons/bi";
import { MdQuiz } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";
import { FaVoteYea } from "react-icons/fa";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const [activeHead, setActiveHead] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActiveHead(true);
      } else {
        setActiveHead(false);
      }
    });
  }
  const options = [
    {
      icon: <BsInfoCircleFill size={25} className={`text-white `} />,
    },
    {
      icon: <BiSolidBookContent size={25} className={`text-white `} />,
    },
    {
      icon: <MdQuiz size={25} className={`text-white `} />,
    },
    {
      icon: <AiFillFileAdd size={25} className={`text-white `} />,
    },
    {
      icon: <FaVoteYea size={25} className={`text-white`} />,
    },
  ];
  return (
    <div
      className={`flex justify-center items-center ${
        active
          ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 bg-white dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80px] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
          : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80px] dark:shadow"
      }`}
    >
      {options.map((option: any, index: number) => (
        <div
          key={index}
          className={`!w-[100px] flex  justify-center items-center px-5`}
        >
          <div
            className={`w-[40px] h-[40px] rounded-full  items-center justify-center hidden 400px:flex ${
              active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
            } relative`}
          >
            {option.icon}
            {index !== options.length - 1 && (
              <div
                className={`absolute h-1 w-[100px] ${
                  active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                } right-[-250%]`}
              ></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
