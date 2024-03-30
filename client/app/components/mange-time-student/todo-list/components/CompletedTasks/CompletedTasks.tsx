"use client";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";
import TaskItem from "../TaskItem/TaskItem";
import Title from "../Title/Title";

const CompletedTasks = () => {
  const { taskList, handleDeleteAllCompletedTasks } = useContext(AppContext);
  const AllcompletedTasks = taskList.filter((task) => task.done).length;

  return (
    <div className="container-complete">
      <div className={`flex justify-between items-center `}>
        <Title iconName="completed" text="Tasks completed" />
        {AllcompletedTasks > 1 && (
          <button
            type="button"
            className={`bg-[crimson] p-1 px-2 mb-3 rounded transition hover:opacity-[0.8] text-white`}
            onClick={() => handleDeleteAllCompletedTasks()}
          >
            Delete All
          </button>
        )}
      </div>

      <div className="task-list-style">
        {taskList.map(
          (task) => task.done && <TaskItem key={task.id} task={task} />
        )}
      </div>
    </div>
  );
};

export default CompletedTasks;
