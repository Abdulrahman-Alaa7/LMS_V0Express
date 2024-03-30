"use client";
import Title from "../Title/Title";
import { useContext, useState } from "react";
import { AppContext } from "../../../AppContext";
import { IoAdd } from "react-icons/io5";

const CreateNewTask = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const { handleAddTask } = useContext(AppContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputValue.length) {
      handleAddTask(inputValue);
      setInputValue("");
    } else setError(true);
  };

  const handleChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    if (error) setError(false);
    setInputValue(target.value);
  };

  return (
    <div className="container-new-task  after:bg-[#ccc] dark:after:bg-[#24293f]">
      <Title iconName="pencil" text="Create a new task" />

      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            className={`flex-1 height-[56px] !bg-[#9e9e9e29] dark:!bg-[#151a37] text-black dark:text-white border border-[#ccc] dark:border-[#24293f] border-r-none
            rounded-tl-[8px] rounded-bl-[8px] px-[16px] outline-none text-[1rem] leading-[150%] font-normal hover:border-[#0095f6] focus:[#0095f6]
            transition`}
            type="text"
            placeholder="Name of task"
            value={inputValue}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-[56px] h-[56px] bg-[#0095f6] rounded-tr-[8px] rounded-br-[8px]  flex justify-center items-center transition hover:opacity-[0.8]"
          >
            <IoAdd size={24} className="!text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewTask;
