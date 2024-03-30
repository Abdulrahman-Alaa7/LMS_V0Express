"use client";
import React, { FC, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const ManagerHeader: FC<Props> = ({ active, setActive }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div
      className={` relative flex flex-col 800px:flex-row  justify-center items-center gap-6 my-6 bg-[#9e9e9e29] dark:!bg-[#151a37] w-fit mx-auto rounded-lg py-2 px-4`}
    >
      <button
        type="button"
        className={`p-2 mx-1 min-w-[150px] rounded-lg font-semibold transition-all ${active === 0 ? "bg-white text-black " : "hover:bg-white hover:text-black"}`}
        onClick={() => setActive(0)}
      >
        Managers
      </button>
      <button
        type="button"
        className={`p-2 mx-1 min-w-[150px] rounded-lg font-semibold transition-all ${active === 1 ? "bg-white text-black " : "hover:bg-white hover:text-black"}`}
        onClick={() => setActive(1)}
      >
        Universities
      </button>
      <button
        type="button"
        className={`p-2 mx-1 min-w-[150px] rounded-lg font-semibold transition-all ${active === 2 ? "bg-white text-black " : "hover:bg-white hover:text-black"}`}
        onClick={() => setActive(2)}
      >
        Faculties
      </button>
      <button
        type="button"
        className={`p-2 mx-1 min-w-[150px] rounded-lg font-semibold transition-all ${active === 3 ? "bg-white text-black " : "hover:bg-white hover:text-black"}`}
        onClick={() => setActive(3)}
      >
        Departments
      </button>
      <button type="button" onClick={() => setOpenMenu(!openMenu)}>
        <BsThreeDotsVertical
          size={30}
          className={`transition p-1  rounded-full hover:text-black hover:bg-white 800px:rotate-180 rotate-90`}
        />
      </button>
      {openMenu && (
        <div className="absolute flex flex-col top-[303px] 800px:top-[57px] right-0 bg-[#9e9e9e29] dark:bg-[#151a37] p-1 rounded-lg gap-2">
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 4 ? "bg-white text-black " : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(4)}
          >
            Professors
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 5 ? "bg-white text-black " : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(5)}
          >
            Students
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 6 ? "bg-white text-black " : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(6)}
          >
            Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default ManagerHeader;
