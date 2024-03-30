"use client";
import React, { FC, useState, useEffect, useContext } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GoGoal } from "react-icons/go";
import { RiEditCircleFill } from "react-icons/ri";
import { MdOutlineTimelapse } from "react-icons/md";
import { RxReset } from "react-icons/rx";
import { AppContext } from "../AppContext";
type Props = {};

const DailyProgress: FC<Props> = ({}) => {
  const {
    percentageDailyGoal,
    edit,
    setEdit,
    goal,
    setGoal,
    handleSaveGoal,
    totalTimeElapsedToady,
  } = useContext(AppContext);

  function formatTime(totalSeconds: any) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${hours} hours, ${minutes} minutes`;
  }

  const formattedTime = formatTime(totalTimeElapsedToady);

  return (
    <div
      className={`800:w-[40%] w-full mb-3  border border-[#ccc] dark:border-[#9e9e9e29] px-5 py-8 rounded-lg`}
    >
      <div
        className={`flex justify-center flex-col gap-4 items-center my-8 w-fit px-2 mx-auto`}
      >
        <div className=" flex justify-center items-center flex-col gap-4">
          <h1
            className={`font-semibold text-[25px] flex items-center justify-center gap-2`}
          >
            Daily Progress
            <GoGoal size={25} />
          </h1>
          <p
            className={`text-[18px] text-gray-500 dark:text-gray-300 !text-center`}
          >
            Completed : {formattedTime}
          </p>
        </div>

        <div className={`flex items-center`}>
          <CircularProgressbar
            value={percentageDailyGoal}
            text={`${percentageDailyGoal}%`}
          />
        </div>
        <p
          className={`text-[18px] text-gray-700 dark:text-gray-400 font-semibold  !text-center`}
        >
          Goal : {Math.floor((goal * 60) / 60)} hours{" "}
        </p>
        <div className={`flex items-center justify-center gap-4`}>
          <button
            type="button"
            className={`bg-[#0095f6] text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 mx-auto transition hover:opacity-[0.8]`}
            onClick={() => setEdit(!edit)}
          >
            <RiEditCircleFill size={20} />
            Edit Goal
          </button>
        </div>
        {edit && (
          <div className={`flex items-center justify-center gap-2`}>
            <div className="w-full relative">
              <div className="relative goal-input">
                <input
                  type="number"
                  value={goal}
                  onChange={(e: any) => setGoal(e.target.value)}
                  id="goal"
                  placeholder=""
                  className={` block pl-2.5 pb-2.5 pt-4 pr-10 text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600  peer w-full outline-none focus:!outline-gray-500 dark:focus:!outline-gray-500 focus:-outline-offset-2`}
                  maxLength={1}
                />
                <label
                  htmlFor="goal"
                  className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#0d121d] px-2 peer-focus:px-2 peer-focus:text-black-600 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-0.5 cursor-text dark:!bg-[#070a11]`}
                >
                  Enter your goal in hours
                </label>
              </div>
            </div>
            <button
              type="button"
              className={`bg-[#0095f6] text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 mx-auto transition hover:opacity-[0.8]`}
              onClick={() => {
                handleSaveGoal(), setEdit(!edit);
              }}
            >
              <MdOutlineTimelapse size={25} />
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyProgress;
