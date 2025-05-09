import React, { FC } from "react";

type Props = {};

const MainCalendarForm: FC<Props> = ({}) => {
  return (
    <>
      <aside
        className="entries__form hide-form"
        style={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          margin: "auto",
          maxWidth: "450px",
        }}
      >
        <aside className="form-modal-overlay hide-form-overlay"></aside>

        <div className="entries__form--header">
          <div className="form-header--dragarea"></div>
          <div className="form--header__icon-close" data-tooltip="close form">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              fill="var(--white2)"
            >
              <path d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z" />
            </svg>
          </div>
        </div>
        <form className="entry-form">
          <div className="entries__form--body">
            {/* <!-- row 1: title --> */}
            <div className="form--body__title form-body-single">
              <input
                type="text"
                placeholder="Add title"
                className="form--body__title-input"
                maxLength={50}
                spellCheck={false}
                required
              />
            </div>

            <div className="form--body__description form-body-single">
              <textarea
                placeholder="Add description"
                className="form--body__description-input"
                maxLength={200}
                spellCheck={false}
              ></textarea>
            </div>

            {/* <!-- row 2: start date & time --> */}
            <div className="form--body__start form-body-double">
              <div className="form--body__start-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  fill="var(--white3)"
                  className="form--body-svg__start"
                >
                  <path d="m15.3 16.7 1.4-1.4-3.7-3.7V7h-2v5.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z" />
                </svg>
              </div>
              <div className="form--body__start-inputs">
                <span
                  className="form--body-start__date"
                  data-form-date-type="start"
                ></span>

                <div className="form-br"></div>

                <span
                  className="form--body-start__time"
                  data-form-time-type="start"
                >
                  1:30am
                </span>
              </div>
            </div>

            {/* <!-- row 3: end date & time --> */}
            <div className="form--body__end form-body-double">
              <div className="form--body__end-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  fill="var(--white3)"
                  className="form--body-svg__end"
                >
                  <path d="m15.3 16.7 1.4-1.4-3.7-3.7V7h-2v5.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z" />
                </svg>
              </div>
              <div className="form--body__end-inputs">
                <span
                  className="form--body-end__date"
                  data-form-date-type="end"
                ></span>

                <div className="form-br"></div>

                <span
                  className="form--body-end__time"
                  data-form-time-type="end"
                >
                  3:30am
                </span>
              </div>
            </div>

            {/* <!-- row 4: category --> */}
            <div className="form--body__category form-body-double">
              <div className="form--body__category-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  fill="var(--white3)"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                </svg>
              </div>
              <div className="form--body__category-inputs">
                <aside
                  className="close-options-floating__btn"
                  style={{
                    zIndex: "-1",
                    userSelect: "none",
                    pointerEvents: "none",
                    opacity: "0",
                    boxShadow: "none",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    fill="var(--white3)"
                  >
                    <path d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z" />
                  </svg>
                </aside>
                <div className="form--body__category-modal--wrapper">
                  <div className="form--body__category-modal--wrapper-selection">
                    <span className="form--body__category-modal--wrapper__color"></span>
                    <span className="form--body__category-modal--wrapper__title"></span>
                  </div>
                  <span className="form--body__category-modal hide-form-category-modal"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="entries__form--footer">
            <button
              className="form--footer__button-cancel"
              type="reset"
              role="button"
              aria-label="button"
            >
              reset
            </button>
            <button
              className="form--footer__button-save"
              type="submit"
              role="button"
              aria-label="button"
            >
              save
            </button>
          </div>
          {/* <!-- footer --> */}
        </form>
      </aside>
    </>
  );
};

export default MainCalendarForm;
