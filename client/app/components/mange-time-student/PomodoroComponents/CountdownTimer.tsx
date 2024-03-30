"use client";
import React, { useState, useEffect, useContext } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AppContext } from "../AppContext";
import { IoPauseOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa6";
import { FaStop } from "react-icons/fa6";

const CountdownTimer: React.FC<{ initialTime: number; percentage: number }> = ({
  initialTime,
  percentage,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const { handleFinish, isPaused, togglePause } = useContext(AppContext);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      <div className="">
        <CircularProgressbar
          value={percentage}
          text={`${formatTime(timeLeft)}`}
        />
        <div className="flex items-center justify-center gap-4 my-4">
          <button
            onClick={togglePause}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 my-3 flex justify-center items-center"
          >
            {isPaused ? <FaPlay size={24} /> : <IoPauseOutline size={24} />}
          </button>
          <button
            onClick={handleFinish}
            className="p-3  bg-red-500 text-white rounded-full hover:bg-red-600 my-3"
          >
            <FaStop size={24} className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CountdownTimer;
