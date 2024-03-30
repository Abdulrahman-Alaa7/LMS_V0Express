"use client";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";
import Title from "../Title/Title";
import { FcRating } from "react-icons/fc";

const Progress = () => {
  const { progressBarValue } = useContext(AppContext);

  return (
    <div className="container-progress after:bg-[#ccc] dark:after:bg-[#24293f]">
      <Title iconName="chart" text={`Progress `} />
      <div className="progress-bar">
        <div
          className={`progress-bar-fill h-[4px] rounded-[2px] bg-[#40fb72]  `}
          style={{ width: `${progressBarValue}%`, transition: "0.8s" }}
        />
      </div>
      <div className="mt-3 flex justify-center items-center font-semibold ">
        <span>{progressBarValue} %</span>
      </div>

      {progressBarValue === 100 && (
        <div className="task-completed-message">
          <span
            className={`text-[1.4rem] leading-[150%] font-semibold text-black dark:text-white flex items-center gap-2 `}
          >
            <FcRating
              size={40}
              className="task-completed-message-icon !animate-bounce"
            />
            Great job!
          </span>
        </div>
      )}
    </div>
  );
};

export default Progress;
