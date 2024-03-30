"use client";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";
import TaskItem from "../TaskItem/TaskItem";
import Title from "../Title/Title";
import { MdDelete } from "react-icons/md";

const TodayTasks = () => {
  const { taskList, progressBarValue } = useContext(AppContext);

  return (
    <div
      className={`today-task-container after:!bg-[#ccc] after:dark:!bg-[#9e9e9e29] ${
        progressBarValue === 100 ? "mt-[-92px]" : "mt-[0px]"
      }`}
    >
      <Title iconName="list" text="Today's task " />

      {progressBarValue === 100 || taskList.length === 0 ? (
        <span className="text-[1rem] leading-[150%] font-semibold flex justify-center border p-2 rounded-full text-black dark:text-white">
          Today&apos;s task list is empty
        </span>
      ) : (
        <ul className="today-task-list ">
          {taskList.map(
            (task) => !task.done && <TaskItem key={task.id} task={task} />
          )}
        </ul>
      )}
    </div>
  );
};

export default TodayTasks;
