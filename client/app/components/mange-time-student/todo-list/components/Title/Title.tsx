"use client";
import React from "react";
import { FaListCheck } from "react-icons/fa6";
import { SiGoogleanalytics } from "react-icons/si";
import { MdLibraryAddCheck } from "react-icons/md";
import { BiSolidMessageSquareEdit } from "react-icons/bi";

type TitleProps = {
  iconName: "pencil" | "list" | "chart" | "completed";
  text: string;
};

const Title = ({ iconName, text }: TitleProps) => {
  // const imgUrl = new URL(`/src/assets/icon-${iconName}.svg`, import.meta.url)
  //   .href;

  return (
    <div className="containr-title">
      <div className="div-icon-title">
        {/* <img src={imgUrl} width="24" height="24" alt={iconName} /> */}
        {iconName === "pencil" && <BiSolidMessageSquareEdit size={30} />}
        {iconName === "list" && <FaListCheck size={24} />}
        {iconName === "chart" && <SiGoogleanalytics size={24} />}
        {iconName === "completed" && <MdLibraryAddCheck size={24} />}
      </div>

      <h2 className="text-[1.2rem] leading-[135%] font-semibold ">{text}</h2>
    </div>
  );
};

export default Title;
