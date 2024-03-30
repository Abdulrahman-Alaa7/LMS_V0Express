"use client";
import React, { FC, useState, useEffect, useContext } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AppContext } from "./AppContext";
const CountdownTimer = dynamic(
  () => import("./PomodoroComponents/CountdownTimer")
);
import DailyProgress from "./PomodoroComponents/DailyProgress";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";

type Props = {};

const PromodoroTap: FC<Props> = ({}) => {
  const {
    initialTime,
    inputValue,
    setInputValue,
    percentage,
    handleOnSubmit,
    timeRun,
  } = useContext(AppContext);

  return (
    <div className={``}>
      <div
        className={`w-[90%] flex justify-between mx-auto items-center 800px:flex-row flex-col gap-4 800px:gap-4`}
      >
        <div
          className={`800:w-[40%] w-full  border border-[#ccc] dark:border-[#9e9e9e29] px-5 py-8 rounded-lg mb-3`}
        >
          <div
            className={`flex justify-center flex-col gap-4 items-center my-8 w-fit px-2 mx-auto`}
          >
            <div className=" flex justify-center items-center flex-col gap-4">
              <h1 className={`font-semibold text-[25px] `}>
                Get ready to focus
              </h1>
              <p className={`text-[18px] text-gray-500 !text-center`}>
                After the time over we will send you an alert, so be focus and
                do not be worry.
              </p>
            </div>

            <div className={`flex items-center`}>
              {timeRun ? (
                <CountdownTimer
                  key={initialTime}
                  initialTime={initialTime}
                  percentage={percentage}
                />
              ) : (
                <div className={`flex items-center`}>
                  <form onSubmit={handleOnSubmit}>
                    <div className="flex mb-6">
                      <input
                        type="number"
                        name="time"
                        id="time"
                        value={inputValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = parseInt(e.target.value);
                          setInputValue(isNaN(value) ? 0 : value);
                        }}
                        placeholder=""
                        className={`500:w-[200px] w-[140px] text-[72px] text-center mx-auto font-semibold h-[120px] p-4  rounded-l-[8px] bg-white dark:bg-gray-900 border-l border-l-[#ccc] border-t border-t-[#ccc] border-b border-b-[#ccc] focus:outline-none dark:border-[#9e9e9e29]`}
                      />
                      <div
                        className={`flex flex-col justify-center items-center`}
                      >
                        <button
                          type="button"
                          className={`border border-[#ccc] dark:border-[#9e9e9e29] py-1 px-2 h-[60px] rounded-r-[8px] rounded-br-none bg-white dark:bg-gray-900 transition hover:opacity-[0.7]`}
                          onClick={() => setInputValue(inputValue + 1)}
                        >
                          <GoPlus size={50} />
                        </button>
                        <button
                          type="button"
                          className={`border border-[#ccc] dark:border-[#9e9e9e29] py-1 px-2 h-[60px] rounded-r-[8px] rounded-tr-none bg-white dark:bg-gray-900 transition hover:opacity-[0.7]`}
                          onClick={() => {
                            inputValue > 1 && setInputValue(inputValue - 1);
                          }}
                        >
                          <FiMinus size={50} />
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className={`bg-[#0095f6] text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 mx-auto transition hover:opacity-[0.8]`}
                    >
                      <IoPlay size={20} />
                      Start foucs session
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
        <DailyProgress />
      </div>
    </div>
  );
};

export default PromodoroTap;
