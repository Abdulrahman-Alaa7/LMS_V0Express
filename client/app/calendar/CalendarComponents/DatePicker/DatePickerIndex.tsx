import React, { FC } from "react";
import DatePickerHeader from "./DatePickerHeader";
import DatePickerBody from "./DatePickerBody";
import DatePickerChange from "./DatePickerChange";

type Props = {};

const DatePickerIndex: FC<Props> = (props: Props) => {
  return (
    <>
      <aside className="datepicker hide-datepicker" style={{ top: "12px" }}>
        <DatePickerHeader />

        <DatePickerBody />

        <DatePickerChange />
      </aside>
    </>
  );
};

export default DatePickerIndex;
