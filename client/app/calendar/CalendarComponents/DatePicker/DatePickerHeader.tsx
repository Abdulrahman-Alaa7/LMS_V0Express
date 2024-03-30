import React, { FC } from "react";

type Props = {};

const DatePickerHeader: FC<Props> = ({}) => {
  return (
    <>
      <div className="datepicker__header">
        <button className="datepicker-title" role="button" aria-label="button">
          October 2022
        </button>
        <div className="datepicker-nav">
          <button
            className="datepicker-nav--prev"
            role="button"
            aria-label="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="var(--white3)"
              style={{ userSelect: "none", pointerEvents: "none" }}
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
            </svg>
          </button>
          <button
            className="datepicker-nav--next"
            role="button"
            aria-label="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="var(--white3)"
              style={{ userSelect: "none", pointerEvents: "none" }}
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M8.59 16.59L10 18l6-6-6-6L8.59 7.41 13.17 12z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default DatePickerHeader;
