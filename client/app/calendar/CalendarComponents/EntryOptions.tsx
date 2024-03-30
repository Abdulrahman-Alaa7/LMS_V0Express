import React, { FC } from "react";

type Props = {};

const EntryOptions: FC<Props> = ({}) => {
  return (
    <>
      <aside className="entry__options entry__options--hidden">
        <div className="entry__options--content">
          <div className="entry__options--header">
            <div className="entry__options-datetime">
              <div className="entry__options-date"></div>
              <div className="entry__options-time"></div>
            </div>

            <div className="entry__options--header-icons">
              <button
                className="entry__options-icon eoi__edit"
                data-tooltip="edit event (e)"
                role="button"
                aria-label="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 0 24 24"
                  width="20px"
                  fill="var(--white2)"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </button>

              <button
                className="entry__options-icon eoi__delete"
                data-tooltip="delete event"
                role="button"
                aria-label="button"
              >
                <svg
                  focusable="false"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="var(--white2)"
                >
                  <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                  <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
                </svg>
              </button>

              <button
                className="entry__options-icon eoi__close"
                data-tooltip="close (esc)"
                role="button"
                aria-label="button"
              >
                <svg
                  focusable="false"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="var(--white2)"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                </svg>
              </button>
            </div>
          </div>
          {/* <!-- end header --> */}

          <div className="entry__options--body">
            <div className="entry-option-desc">
              <div className="eob-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
                  fill="var(--white2)"
                >
                  <path d="M6 12v-1.5h8V12Zm0 3v-1.5h6V15Zm-1.5 3q-.625 0-1.062-.448Q3 17.104 3 16.5v-11q0-.604.438-1.052Q3.875 4 4.5 4H6V2h1.5v2h5V2H14v2h1.5q.625 0 1.062.448Q17 4.896 17 5.5v11q0 .604-.438 1.052Q16.125 18 15.5 18Zm0-1.5h11V9h-11v7.5Z" />
                </svg>
              </div>
              <div className="eob-title"></div>
            </div>
            <div className="entry-option-desc">
              <div className="eob-icon"></div>
              <div className="eob-description"></div>
            </div>
            <div className="entry-option-desc">
              <div className="eob-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
                  className="eob-category--icon"
                  fill="var(--primarylight1)"
                >
                  <path d="M10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z" />
                </svg>
              </div>
              <div className="eob-category"></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default EntryOptions;
