"use client";
import React, { FC } from "react";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const SettingsHeader: FC<Props> = ({ active, setActive }) => {
  return (
    <div
      className={`flex justify-center items-center gap-6 my-6 bg-[#9e9e9e29] dark:!bg-[#151a37] w-fit mx-auto rounded-lg p-2`}
    >
      <button
        type="button"
        className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 0 ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}
        onClick={() => setActive(0)}
      >
        General
      </button>
      <button
        type="button"
        className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 1 ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}
        onClick={() => setActive(1)}
      >
        Private
      </button>
    </div>
  );
};

export default SettingsHeader;
