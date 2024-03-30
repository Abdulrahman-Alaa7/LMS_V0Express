import React, { FC } from "react";
import { styles } from "../../styles/style";

type Props = {};

const Header: FC<Props> = ({}) => {
  return (
    <header className="header">
      <div className="h__container">
        <div className="h-col-1">
          <button
            className="menu"
            data-tooltip="Main menu"
            aria-label="button"
            role="button"
          >
            <svg
              focusable="false"
              style={{ pointerEvents: "none" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              fill="var(--white2)"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>

          <div className="logo" data-current-day-of-month="0">
            {/* <svg
              height="36"
              viewBox="0 0 36 36"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <path d="m0 0h36v36h-36z" />
                <g fillRule="nonzero" transform="translate(3.75 3.75)">
                  <path
                    d="m21.75 6.75-6.75-.75-8.25.75-.75 7.5.75 7.5 7.5.9375 7.5-.9375.75-7.6875z"
                    fill="#fff"
                  />
                  <path
                    d="m21.75 28.5 6.75-6.75-3.375-1.5-3.375 1.5-1.5 3.375z"
                    fill="#ea4335"
                  />
                  <path
                    d="m5.25 25.125 1.5 3.375h15v-6.75h-15z"
                    fill="#34a853"
                  />
                  <path
                    d="m2.25 0c-1.243125 0-2.25 1.006875-2.25 2.25v19.5l3.375 1.5 3.375-1.5v-15h15l1.5-3.375-1.5-3.375z"
                    fill="#4285f4"
                  />
                  <path
                    d="m0 21.75v4.5c0 1.243125 1.006875 2.25 2.25 2.25h4.5v-6.75z"
                    fill="#188038"
                  />
                  <path
                    d="m21.75 6.75v15h6.75v-15l-3.375-1.5z"
                    fill="#fbbc04"
                  />
                  <path
                    d="m28.5 6.75v-4.5c0-1.243125-1.006875-2.25-2.25-2.25h-4.5v6.75z"
                    fill="#1967d2"
                  />
                </g>
              </g>
            </svg> */}
          </div>

          <h3 className="header-title">
            <span className={`${styles.textGradient}`}>Calendar</span>
          </h3>

          <button
            className="btn-root btn-today"
            style={{ cursor: "pointer" }}
            aria-label="button"
            role="button"
          >
            Today
          </button>
        </div>

        <div className="group-right">
          <div className="h-col-2">
            <div className="prev-next">
              <button className="prev" aria-label="button" role="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="var(--white2)"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button className="next" aria-label="button" role="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="var(--white2)"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M8.59 16.59L10 18l6-6-6-6L8.59 7.41 13.17 12z" />
                </svg>
              </button>
            </div>

            <div className="datetime-wrapper">
              <button
                className="datetime-content"
                aria-label="button"
                role="button"
              >
                <div className="datetime-content--title">January 2023</div>
              </button>
            </div>
          </div>

          <div className="h-col-3">
            <button
              className="h-search"
              data-tooltip="search"
              aria-label="button"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                fill="var(--white3)"
              >
                <path d="m19.6 21-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5 7.625 5 6.312 6.312 5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z" />
              </svg>
            </button>
            <button
              className="settings"
              data-tooltip="settings"
              aria-label="button"
              role="button"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                focusable="false"
                fill="var(--white3)"
              >
                <path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path>
                <circle cx="12" cy="12" r="3.5"></circle>
              </svg>
            </button>

            <div className="select-wrapper">
              <button
                name="select__modal"
                id="s-modals"
                className="select__modal"
                aria-label="button"
                role="button"
              >
                Month
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
