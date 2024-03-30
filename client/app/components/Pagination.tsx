"use client";
import React from "react";

type Props = {
  contentsPerPage: any;
  totalContents: any;
  paginate: any;
  currentPage: any;
};

const Pagination = ({
  contentsPerPage,
  totalContents,
  paginate,
  currentPage,
}: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalContents / contentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex items-center justify-center gap-3 flex-wrap">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`font-semibold text-[20px] cursor-pointer !flex items-center justify-center my-3 bg-[#9e9e9e29] w-[50px] h-[50px] p-2 transition hover:opacity-[0.9] rounded-full ${
              currentPage == number && "!bg-[#0095f6] text-white"
            }`}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
