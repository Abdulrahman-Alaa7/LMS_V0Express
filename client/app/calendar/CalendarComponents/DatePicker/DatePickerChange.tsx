import React, { FC } from "react";

type Props = {};

const DatePickerChange: FC<Props> = ({}) => {
  return (
    <>
      <aside className="datepicker-change-date hide-dpcd">
        <aside className="close-change-date">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 0 24 24"
            width="18px"
            fill="var(--white3)"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </aside>

        <div className="yearpicker">
          <button
            className="yearpicker-prev"
            type="button"
            // onClick={onPrevYear}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="var(--white4)"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          {/* <div className="yearpicker-title">{year}</div> */}
          <button
            className="yearpicker-next"
            type="button"
            // onClick={onNextYear}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="var(--white4)"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
        <div className="monthpicker">
          <div className="monthpicker__month" data-dp-month="0">
            January
          </div>
          <div className="monthpicker__month" data-dp-month="1">
            February
          </div>
          <div className="monthpicker__month" data-dp-month="2">
            March
          </div>
          <div className="monthpicker__month" data-dp-month="3">
            April
          </div>
          <div className="monthpicker__month" data-dp-month="4">
            May
          </div>
          <div className="monthpicker__month" data-dp-month="5">
            June
          </div>
          <div className="monthpicker__month" data-dp-month="6">
            July
          </div>
          <div className="monthpicker__month" data-dp-month="7">
            August
          </div>
          <div className="monthpicker__month" data-dp-month="8">
            September
          </div>
          <div className="monthpicker__month" data-dp-month="9">
            October
          </div>
          <div className="monthpicker__month" data-dp-month="10">
            November
          </div>
          <div className="monthpicker__month" data-dp-month="11">
            December
          </div>
        </div>
      </aside>
    </>
  );
};

export default DatePickerChange;
