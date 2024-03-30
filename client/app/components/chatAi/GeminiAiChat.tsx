"use client";
import React, { FC, useEffect, useState, useRef } from "react";
import { useGeminiChatMutation } from "../../../redux/features/chatAi/chatAiApi";
import Link from "next/link";
import { BiArrowBack, BiSolidSend } from "react-icons/bi";
import {
  RiMessage3Fill,
  RiSettingsFill,
  RiChatSmile3Fill,
} from "react-icons/ri";
import { AiOutlineClear } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { styles } from "../../styles/style";
import { ThemeToggle } from "@/app/utils/theme-toggle";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import avatar from "../../../public/assets/avatar.png";
import Image from "next/image";
import SidebarProfileStudent from "../Sidebars/SidebarProfileStudent";

type Props = {};

const GeminiAiChat: FC<Props> = ({}) => {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [chatHistory, setChathistory] = useState<any>([]);
  const { user } = useSelector((state: any) => state.auth);

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question");
      return;
    }
    setChathistory((oldChatHistory: any) => [
      ...oldChatHistory,
      {
        role: "user",
        parts: value,
      },
    ]);
    setValue("");

    try {
      setIsWaitingForResponse(true);
      const option = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        "http://localhost:7777/api/v1/gemini",
        option
      );
      const data = await response.text();
      setChathistory((oldChatHistory: any) => [
        ...oldChatHistory,
        {
          role: "model",
          parts: data,
        },
      ]);
      setValue("");
    } catch (error: any) {
      console.log(error);
      setError("Something went wrong! please try again later");
    } finally {
      setIsWaitingForResponse(false);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && value.trim() !== "") {
      event.preventDefault();
      getResponse();
    }
  };

  const clearChat = () => {
    setValue("");
    setError("");
    setChathistory([]);
  };

  const handleDrawerOpen = () => {
    setOpenSidebar(true);
  };

  return (
    <div className={`chat-ai-page w-[90%] mx-auto`}>
      <div className="dark:absolute dark:left-0 dark:top-0 dark:w-full dark:h-full dark:bg-[#151a37]"></div>
      <div className="main-title chat-ai sticky top-[0px] flex justify-between items-center border-b py-2 border-b-[#9e9e9e29] z-20 ">
        <div className=" flex items-center gap-2">
          <div className="flex items-center ">
            <div className="arrow-back flex justify-center items-center mt-1 transition  hover:bg-[#9e9e9e29] p-2 rounded-full">
              <Link href={`/profile`}>
                <IoIosArrowBack
                  size={30}
                  className={`text-gray-500 dark:text-white`}
                />
              </Link>
            </div>
            <h1 className="w-fit font-robo text-3xl font-bold flex items-center ">
              <span className={`${styles.textGradient}`}> ChatAI </span>
              <RiMessage3Fill size={28} color="#0095f6" className="mt-1 " />
            </h1>

            {isWaitingForResponse && (
              <div className="p-1 mt-1 mx-2 bg-gradient-to-tr animate-spin from-green-500 to-blue-500 via-purple-500 rounded-full">
                <div className="bg-white dark:bg-[#151a37] rounded-full">
                  <div className="w-4 h-4 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        {openSidebar && (
          <>
            <SidebarProfileStudent
              user={user}
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
            />
          </>
        )}
        <div className=" flex justify-center items-center">
          <div
            className="text-white text-xl clear-chat-btn w-[35px] h-[35px] rounded-full  bg-[#0095f6] flex justify-center items-center cursor-pointer duration-600 hover:opacity-90 "
            onClick={() => clearChat()}
          >
            <AiOutlineClear size={24} className="text-white " />
          </div>
          <button type="button" onClick={handleDrawerOpen}>
            <Image
              src={
                user?.avatar || avatar ? user?.avatar?.url || avatar : avatar
              }
              alt=""
              className={`w-[30px] h-[30px] rounded-full cursor-pointer mx-2`}
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>
      <div className="message-res py-4 relative ">
        {chatHistory.length === 0 ? (
          <div className="absolute no-message flex flex-col gap-3 justify-center items-center top-1/2 -translate-y-1/2 -translate-x-1/2  left-1/2 ">
            <h2 className="text-grey text-1xl sm:text-2xl">No message yet.</h2>
            <RiMessage3Fill
              size={45}
              color="#0095f6"
              className="animate-bounce"
            />
          </div>
        ) : (
          <div className="main-section-message">
            {chatHistory.map((chatItem: any, index: number) => (
              <div key={index}>
                <p
                  className={`answer ${chatItem.role === "user" ? "!bg-[#00000013] " : "bg-[#fff]"} dark:bg-[#9e9e9e29] my-3 mx-2 rounded-lg p-2 flex gap-2`}
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {chatItem.role == "user" ? (
                    <Image
                      src={
                        user?.avatar || avatar
                          ? user?.avatar?.url || avatar
                          : avatar
                      }
                      alt="user"
                      className={`w-[30px] h-[30px] rounded-full cursor-pointer `}
                      width={30}
                      height={30}
                    />
                  ) : (
                    <span>
                      <RiMessage3Fill
                        size={28}
                        className="text-[#0095f6] !text-[28px]"
                      />
                    </span>
                  )}
                  <span className={`mt-1`}>{chatItem.parts}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bot-area pt-3 border-t border-t-[#9e9e9e29] min-h-[135px] relative">
        <div className="input-chat-ai relative w-full sm:w-9/12 mx-auto bg-[#f0f4f9] border border-[#9e9e9e29] py-2 rounded-xl drop-shadow-lg dark:bg-[#151a37]">
          <div className="relative flex items-center flex-col justify-center ">
            <textarea
              className={`w-full pl-3 pr-14 focus:outline-none resize-none transition duration-300 bg-[#f0f4f9] p-1 dark:bg-[#151a37]`}
              style={{
                minHeight: "35px",
                maxHeight: "72px",
              }}
              placeholder="Send a message"
              value={value}
              onChange={(e: any) => {
                setValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              disabled={isWaitingForResponse}
            />
            <button
              type="button"
              className={`absolute ${isWaitingForResponse || value.length === 0 ? "bg-transparent cursor-default" : "bg-[#0095f6] cursor-pointer "} bottom-0 p-2 right-5 duration-600 w-[35px] h-[35px] rounded-lg  duration-600 hover:opacity-90 flex justify-center items-center `}
              onClick={() => getResponse()}
              disabled={isWaitingForResponse}
            >
              <BiSolidSend
                size={25}
                className={`${isWaitingForResponse || value.length === 0 ? "text-black" : "text-white"}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiAiChat;
