"use client";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import { LuCalendarClock } from "react-icons/lu";
import { FaExternalLinkAlt } from "react-icons/fa";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const MangeTimeHeader: FC<Props> = ({ active, setActive }) => {
  return (
    <div
      className={`flex flex-col 800px:flex-row justify-center items-center gap-6 my-6 bg-[#9e9e9e29] dark:!bg-[#151a37] w-fit mx-auto rounded-lg p-2`}
    >
      <button
        type="button"
        className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold ${active === 0 && "bg-white dark:bg-[#9e9e9e29]"}`}
        onClick={() => setActive(0)}
      >
        Stay focus
      </button>
      <button
        type="button"
        className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold ${active === 1 && "bg-white dark:bg-[#9e9e9e29]"}`}
        onClick={() => setActive(1)}
      >
        Todo list
      </button>

      <Link
        href={`/calendar`}
        className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold !bg-black !text-white text-center flex justify-center items-center gap-2 transitio hover:opacity-[0.8]`}
        target="_blank"
      >
        <LuCalendarClock size={22} />
        Calendar
        <FaExternalLinkAlt size={12} />
      </Link>
    </div>
  );
};

export default MangeTimeHeader;
