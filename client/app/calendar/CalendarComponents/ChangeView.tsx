import React, { FC } from "react";

type Props = {};

const ChangeView: FC<Props> = ({}) => {
  return (
    <>
      <aside className="change-view--wrapper toggle-options">
        <div className="change-view--options">
          <div className="change-view--option">
            <div
              className="view-option"
              data-view-option="day"
              data-view-key="D"
            >
              Day
            </div>
            <div
              className="view-option"
              data-view-option="week"
              data-view-key="W"
            >
              Week
            </div>
            <div
              className="view-option"
              data-view-option="month"
              data-view-key="M"
            >
              Month
            </div>
            <div
              className="view-option"
              data-view-option="year"
              data-view-key="Y"
            >
              Year
            </div>
            <div
              className="view-option"
              data-view-option="list"
              data-view-key="L"
            >
              List
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ChangeView;
