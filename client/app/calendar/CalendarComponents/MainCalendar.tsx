import React, { FC } from "react";
import { LuCalendarPlus } from "react-icons/lu";

type Props = {};

const MainCalendar: FC<Props> = (props: Props) => {
  return (
    <>
      <main className="main">
        {/* <!-- hide-sidebar --> */}
        <aside className="sidebar sidebar-transition hide-sidebar">
          {/* <!-- sidebar header --> */}
          <div className="sidebar-content--header">
            <button
              className="sb-toggle-form-btn"
              aria-label="button"
              role="button"
            >
              <span className="stfb">
                {/* <svg width="36" height="36" viewBox="0 0 36 36">
                  <path fill="#34A853" d="M16 16v14h4V20z"></path>
                  <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
                  <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
                  <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
                  <path fill="none" d="M0 0h36v36H0z"></path>
                </svg> */}
                <LuCalendarPlus size={25} className="text-[#0095f6]" />
              </span>
              <span className="sb-toggle-form-btn__content">Create</span>
            </button>

            <div className="sb-icon-toggles"></div>
            <button className="sb-data-btn" aria-label="button" role="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                fill="var(--white2)"
              >
                <path d="M6 14q-.825 0-1.412-.588Q4 12.825 4 12t.588-1.413Q5.175 10 6 10t1.412.587Q8 11.175 8 12q0 .825-.588 1.412Q6.825 14 6 14Zm6 0q-.825 0-1.412-.588Q10 12.825 10 12t.588-1.413Q11.175 10 12 10t1.413.587Q14 11.175 14 12q0 .825-.587 1.412Q12.825 14 12 14Zm6 0q-.825 0-1.413-.588Q16 12.825 16 12t.587-1.413Q17.175 10 18 10q.825 0 1.413.587Q20 11.175 20 12q0 .825-.587 1.412Q18.825 14 18 14Z" />
              </svg>
            </button>
          </div>

          {/* <!-- sidebar content (datepicker/categories) --> */}
          <div className="sidebar-content__wrapper">
            {/* <!-- datepicker --> */}
            <div className="datepicker-sidebar">
              <div className="sb-datepicker__content">
                <div className="sbdatepicker__header">
                  <button
                    className="sbdatepicker-title"
                    aria-label="button"
                    role="button"
                  >
                    October 2022
                  </button>
                  <div className="sbdatepicker-nav">
                    <button
                      className="sbdatepicker-nav--prev"
                      aria-label="button"
                      role="button"
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
                      className="sbdatepicker-nav--next"
                      aria-label="button"
                      role="button"
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
                <div className="sbdatepicker__body">
                  {/* <!-- create a 7x7 table --> */}

                  <div className="sbdatepicker__body--header">
                    <div className="sbdatepicker__body--header-cell">S</div>
                    <div className="sbdatepicker__body--header-cell">M</div>
                    <div className="sbdatepicker__body--header-cell">T</div>
                    <div className="sbdatepicker__body--header-cell">W</div>
                    <div className="sbdatepicker__body--header-cell">T</div>
                    <div className="sbdatepicker__body--header-cell">F</div>
                    <div className="sbdatepicker__body--header-cell">S</div>
                  </div>

                  <div className="sbdatepicker__body--dates"></div>
                </div>

                <aside className="sb-datepicker-change-date hide-sbdpcd">
                  <aside className="sb-close-change-date">
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

                  <div className="sb-yearpicker">
                    <div className="sb-yearpicker-prev">
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
                    </div>
                    <div className="sb-yearpicker-title">2023</div>
                    <div className="sb-yearpicker-next">
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
                    </div>
                  </div>
                  <div className="sb-monthpicker">
                    <div className="sb-monthpicker__month" data-sbdp-month="0">
                      January
                    </div>
                    <div className="sb-monthpicker__month" data-sbdp-month="1">
                      February
                    </div>
                    <div className="sb-monthpicker__month" data-sbdp-month="2">
                      March
                    </div>
                    <div className="sb-monthpicker__month" data-sbdp-month="3">
                      April
                    </div>
                    <div className="sb-monthpicker__month" data-sbdp-month="4">
                      May
                    </div>
                    <div className="sb-monthpicker__month" data-sbdp-month="5">
                      June
                    </div>
                    <div className="sb-monthpicker__month" data-sbdp-month="6">
                      July
                    </div>
                    <div className="sb-monthpicker__month" data-sbdp-month="7">
                      August
                    </div>
                    <div className="sb-monthpicker__month" data-sbdp-month="8">
                      September
                    </div>
                    <div className="sb-monthpicker__month" data-sbdp-month="9">
                      October
                    </div>
                    <div className="sb-monthpicker__month" data-sbdp-month="10">
                      November
                    </div>
                    <div className="sb-monthpicker__month" data-sbdp-month="11">
                      December
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            {/* <!-- category modal --> */}
            <div className="sb__categories">
              <div
                className="sb__categories--header"
                style={{ backgroundColor: "var(--black1)" }}
              >
                <div className="sbch-col__one">
                  <div className="sbch-title">My Calendars</div>
                  <div className="sbch-caret sbch-caret--open">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                      fill="var(--white2)"
                    >
                      <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" />
                    </svg>
                  </div>
                </div>

                <div className="sbch-plus">
                  <svg
                    xmlns="http://www.w3.sorg/2000/svg"
                    height="24"
                    width="24"
                    fill="var(--white2)"
                    style={{ pointerEvents: "none" }}
                  >
                    <path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
                  </svg>
                </div>
              </div>

              <div className="sb__categories--body">
                {/* <!-- renders via ./sidebarCategories.js --> */}
                <div className="sb__categories--body-form"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* <!-- calendar views --> */}
        <div className="container__calendars cc-tran">
          {/* <!-- yearview --> */}
          <div className="yearview hide-view">
            <div className="calendar__yearview"></div>
          </div>

          {/* <!-- monthview --> */}
          <div className="monthview hide-view">
            <div className="monthview__top">
              <div className="monthview__top-weekname">SUN</div>
              <div className="monthview__top-weekname">MON</div>
              <div className="monthview__top-weekname">TUE</div>
              <div className="monthview__top-weekname">WED</div>
              <div className="monthview__top-weekname">THU</div>
              <div className="monthview__top-weekname">FRI</div>
              <div className="monthview__top-weekname">SAT</div>
            </div>
            <div className="monthview--calendar"></div>
          </div>

          {/* <!-- weekview --> */}
          <div className="weekview hide-view">
            <div className="weekview__top">
              <div></div>
              <div className="weekview--header">
                <div className="weekview--header-day">
                  <span className="weekview--header-day__title">SUN</span>
                  <button className="weekview--header-day__number">1</button>
                </div>
                <div className="weekview--header-day">
                  <span className="weekview--header-day__title">MON</span>
                  <button className="weekview--header-day__number">2</button>
                </div>
                <div className="weekview--header-day">
                  <span className="weekview--header-day__title">TUE</span>
                  <button className="weekview--header-day__number">3</button>
                </div>
                <div className="weekview--header-day">
                  <span className="weekview--header-day__title">WED</span>
                  <button className="weekview--header-day__number">4</button>
                </div>
                <div className="weekview--header-day">
                  <span className="weekview--header-day__title">THU</span>
                  <button className="weekview--header-day__number">5</button>
                </div>
                <div className="weekview--header-day">
                  <span className="weekview--header-day__title">FRI</span>
                  <button className="weekview--header-day__number">6</button>
                </div>
                <div className="weekview--header-day">
                  <span className="weekview--header-day__title">SAT</span>
                  <button className="weekview--header-day__number">7</button>
                </div>
              </div>
              <div className="wv-gmt"></div>
              <div className="weekview--allday-module">
                <div
                  className="allday--col"
                  data-allday-column="0"
                  data-wv-top="true"
                ></div>
                <div
                  className="allday--col"
                  data-allday-column="1"
                  data-wv-top="true"
                ></div>
                <div
                  className="allday--col"
                  data-allday-column="2"
                  data-wv-top="true"
                ></div>
                <div
                  className="allday--col"
                  data-allday-column="3"
                  data-wv-top="true"
                ></div>
                <div
                  className="allday--col"
                  data-allday-column="4"
                  data-wv-top="true"
                ></div>
                <div
                  className="allday--col"
                  data-allday-column="5"
                  data-wv-top="true"
                ></div>
                <div
                  className="allday--col"
                  data-allday-column="6"
                  data-wv-top="true"
                ></div>
              </div>
            </div>

            <div className="weekview__grid">
              <div className="weekview--sidebar"></div>

              <div className="weekview--calendar">
                <div
                  className="week--col"
                  data-column-index="0"
                  data-wv-top="false"
                ></div>
                <div
                  className="week--col"
                  data-column-index="1"
                  data-wv-top="false"
                ></div>
                <div
                  className="week--col"
                  data-column-index="2"
                  data-wv-top="false"
                ></div>
                <div
                  className="week--col"
                  data-column-index="3"
                  data-wv-top="false"
                ></div>
                <div
                  className="week--col"
                  data-column-index="4"
                  data-wv-top="false"
                ></div>
                <div
                  className="week--col"
                  data-column-index="5"
                  data-wv-top="false"
                ></div>
                <div
                  className="week--col"
                  data-column-index="6"
                  data-wv-top="false"
                ></div>
              </div>

              <div></div>
              <div className="weekview--footer"></div>
            </div>
          </div>

          {/* <!-- dayview --> */}
          <div className="dayview hide-view">
            <div className="calendar__dayview">
              {/* <!-- row 1 --> */}
              <div className="dayview--header">
                <div className="dayview--header-day">
                  <div className="dayview--header-day__title">SUN</div>
                  <div className="dayview--header-day__number">1</div>
                </div>
                <div className="dv-info-day-wrapper">
                  <div className="dayview--header-day__info"></div>
                </div>
              </div>

              {/* <!-- row 2 --> */}
              <div className="dv-ontop-row2">
                <div className="dv-gmt">gmt-one</div>
                <div
                  className="dayview--ontop-container"
                  data-dv-top="true"
                ></div>
              </div>

              {/* <!-- row 3 --> */}
              <div className="dayview__grid">
                <div className="dayview__grid--wrapper">
                  <div className="dayview--side-grid__wrapper">
                    <div className="dayview--side-grid"></div>
                  </div>

                  <div className="dayview--main-grid" data-dv-top="false"></div>
                </div>
                <div className="dayview--footer"></div>
              </div>
            </div>
          </div>

          {/* <!-- listview --> */}
          <div className="listview hide-view">
            <div className="listview__body"></div>
          </div>

          {/* <!-- stats view --> */}
        </div>
      </main>
    </>
  );
};

export default MainCalendar;
