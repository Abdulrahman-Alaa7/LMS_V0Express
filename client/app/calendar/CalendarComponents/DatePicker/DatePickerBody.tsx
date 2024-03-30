import React, { FC } from "react";

type Props = {};

const DatePickerBody: FC<Props> = ({}) => {
  return (
    <>
      <div className="datepicker__body">
        <div className="datepicker__body--header">
          <div className="datepicker__body--header-cell">S</div>
          <div className="datepicker__body--header-cell">M</div>
          <div className="datepicker__body--header-cell">T</div>
          <div className="datepicker__body--header-cell">W</div>
          <div className="datepicker__body--header-cell">T</div>
          <div className="datepicker__body--header-cell">F</div>
          <div className="datepicker__body--header-cell">S</div>
        </div>
        <div className="datepicker__body--dates"></div>
      </div>
    </>
  );
};

export default DatePickerBody;
