"use client";
import React, { FC, useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import StudentProtected from "../hooks/studentProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import Footer from "../components/Footer";
import MangeTimeHeader from "../components/mange-time-student/MangeTimeHeader";
import PromodoroTap from "../components/mange-time-student/PromodoroTap";
import TodoListTap from "../components/mange-time-student/TodoListTap";

type Props = {};

const Page: FC<Props> = ({}) => {
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});
  const [scroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const [active, setActive] = useState(0);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <>
      <StudentProtected>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <Heading
              title={`Mange Time | ELearning`}
              description="LMS is a platform for students to learn and get help from teachers"
              keywords="Programming, Science, Languages,etc"
            />
            <Header
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              route={route}
            />
            <div>
              <MangeTimeHeader active={active} setActive={setActive} />
            </div>
            {active === 0 && (
              <div className={`min-h-[70.2vh] `}>
                <PromodoroTap />
              </div>
            )}
            {active === 1 && (
              <div className={`min-h-[70.2vh] `}>
                <TodoListTap />
              </div>
            )}

            <Footer />
          </div>
        )}
      </StudentProtected>
    </>
  );
};

export default Page;
