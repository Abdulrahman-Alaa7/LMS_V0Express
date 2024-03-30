"use client";
import React, { FC } from "react";
import { useSelector } from "react-redux";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const StudyYearsHeader: FC<Props> = ({ active, setActive }) => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div
      className={`flex flex-col 800px:flex-row ${user?.yearsOfStudy === 7 && "1300px:!flex-row flex-col"} ${user?.yearsOfStudy === 5 && "992px:!flex-row flex-col"} ${user?.yearsOfStudy === 6 && "1100px:!flex-row !flex-col"} justify-center items-center gap-6 my-6 bg-[#9e9e9e29] dark:!bg-[#151a37] w-fit mx-auto rounded-lg p-2`}
    >
      {user?.yearsOfStudy === 1 && (
        <>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 0 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(0)}
          >
            First Year
          </button>
        </>
      )}
      {user?.yearsOfStudy === 2 && (
        <>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 0 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(0)}
          >
            First Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 1 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(1)}
          >
            Second Year
          </button>
        </>
      )}
      {user?.yearsOfStudy === 3 && (
        <>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 0 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(0)}
          >
            First Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 1 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(1)}
          >
            Second Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 2 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(2)}
          >
            Third Year
          </button>
        </>
      )}
      {user?.yearsOfStudy === 4 && (
        <>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 0 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(0)}
          >
            First Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 1 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(1)}
          >
            Second Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 2 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(2)}
          >
            Third Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 3 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(3)}
          >
            Fourth Year
          </button>
        </>
      )}
      {user?.yearsOfStudy === 5 && (
        <>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 0 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(0)}
          >
            First Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 1 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(1)}
          >
            Second Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 2 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(2)}
          >
            Third Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 3 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(3)}
          >
            Fourth Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 4 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(4)}
          >
            Fifth Year
          </button>
        </>
      )}
      {user?.yearsOfStudy === 6 && (
        <>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 0 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(0)}
          >
            First Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 1 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(1)}
          >
            Second Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 2 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(2)}
          >
            Third Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 3 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(3)}
          >
            Fourth Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 4 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(4)}
          >
            Fifth Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 5 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(5)}
          >
            Sixth Year
          </button>
        </>
      )}
      {user?.yearsOfStudy === 7 && (
        <>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 0 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(0)}
          >
            First Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 1 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(1)}
          >
            Second Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 2 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(2)}
          >
            Third Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 3 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(3)}
          >
            Fourth Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 4 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(4)}
          >
            Fifth Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 5 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(5)}
          >
            Sixth Year
          </button>
          <button
            type="button"
            className={`p-2 mx-2 min-w-[150px] rounded-lg font-semibold transition-all ${active === 6 ? "bg-white dark:bg-[#9e9e9e29]" : "hover:bg-white hover:text-black"}`}
            onClick={() => setActive(6)}
          >
            Seventh Year
          </button>
        </>
      )}
    </div>
  );
};

export default StudyYearsHeader;
