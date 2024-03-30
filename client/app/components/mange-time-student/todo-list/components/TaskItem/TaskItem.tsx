"use client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppContext";
import { IoCheckmark } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";

type TaskItemProps = {
  task: Task;
};
type Task = {
  id: number;
  name: string;
  done: boolean;
};

const TaskItem = ({ task }: TaskItemProps) => {
  const { handleTaskChange, handleTaskDelete, handleTaskNewVlaue } =
    useContext(AppContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newValue, setNewValue] = useState(task.name);
  const [hovered, setHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <li
      className={`container-task-item justify-between ${
        task.done
          ? "!bg-[#0095f666] border border-[#0095f6]"
          : "dark:!bg-[#151a37] bg-[#9e9e9e29] border border-[#9e9e9e29] dark:!border-[#24293f]"
      }`}
    >
      <div className={`flex items-center`}>
        <label>
          <input
            className={`input-check-box-task-item `}
            type="checkbox"
            checked={task.done}
            onChange={(e) => handleTaskChange(task.id, e.target.checked)}
          />
          <div
            className={`task-item-custom-checkbox ${
              task.done ? "after:!hidden" : "hover:after:!block hover:after:bg"
            }`}
          >
            {task.done && (
              <div
                className={`task-item-custom-checkbox-checked ${
                  hovered ? "!bg-[crimson]" : "!bg-[#0095f6]"
                }`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {task.done && (
                  <div className="task-item-custom-checkbox-checked">
                    {(isSmallScreen || hovered) && (
                      <FiMinus size={20} className={`!text-white`} />
                    )}
                    {!isSmallScreen && !hovered && (
                      <IoCheckmark size={20} className={`!text-white`} />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </label>
        <Tooltip title={`${task.name}`}>
          <span
            className={`task-item-task-name !font-semibold ${task.done && "!text-gray-900 dark:!text-white "}`}
          >
            {task.name.length > 25
              ? `${task.name.substring(0, 25)}...`
              : task.name}
          </span>
        </Tooltip>
      </div>

      <div className={`flex gap-2 items-center`}>
        {!task.done && (
          <button
            type="button"
            className="task-item-trash-btn !bg-[#9e9e9e29] p-2 rounded-full transition hover:opacity-[0.8]"
            onClick={() => {
              setIsPopupOpen(!isPopupOpen), setNewValue(task.name);
            }}
          >
            <MdEdit size={22} className={`!text-black dark:!text-white`} />
          </button>
        )}
        <button
          type="button"
          className="task-item-trash-btn"
          onClick={() => handleTaskDelete(task.id)}
        >
          <AiOutlineDelete
            size={24}
            className={`hover:!text-[crimson] text-black dark:text-white `}
          />
        </button>
        {isPopupOpen && (
          <div className="popup-overlay">
            <div
              className={`popup flex flex-col p-3 
                bg-white text-black dark:bg-[#151a37] dark:text-white dark:before:bg-gray-500
              `}
            >
              <h4
                className={`font-bold text-lg py-3 text-center border-b text-black dark:text-white 
                }`}
              >
                Edit Task
              </h4>
              <div className="relative email-input my-4">
                <input
                  type="text"
                  id="task"
                  className="w-full block px-2.5 pb-2.5 pt-4 text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none peer"
                  placeholder=" "
                  value={newValue}
                  onChange={(e: any) => setNewValue(e.target.value)}
                />
                <label
                  htmlFor="task"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#151a37] px-2 peer-focus:px-2 peer-focus:text-[#0095f6] peer-focus:dark:text-[#0095f6] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Task name
                </label>
              </div>
              <div className={`flex items-center justify-end gap-6`}>
                <button
                  className={`bg-[#9e9e9e29] px-4 py-2 rounded-lg  font-semibold transition hover:opacity-[0.8]`}
                  onClick={() => setIsPopupOpen(false)}
                >
                  Close
                </button>
                <button
                  className={`bg-[#0095f5] px-4 py-2 rounded-lg text-white font-semibold transition hover:opacity-[0.8]`}
                  onClick={() => {
                    handleTaskNewVlaue(task.id, newValue),
                      setIsPopupOpen(false);
                  }}
                  disabled={task.name === newValue}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
