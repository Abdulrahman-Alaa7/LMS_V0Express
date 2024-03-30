"use client";
import React, { FC, useState, useEffect } from "react";
import Heading from "../utils/Heading";
import { useSelector } from "react-redux";
import ProfessorProtected from "../hooks/professorProtected";
import AllCourses from "../components/professor/InfoCourses/AllCourses";
import Header from "../components/Header";
type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  const [scroll, setScroll] = useState(false);
  const logOutHandler = async () => {};

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
    <div>
      <ProfessorProtected>
        <Heading
          title={`${user?.name} | Admin LMS`}
          description="LMS is a platform for students to learn and get help from teachers"
          keywords="Programming, Science, Languages,etc"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={5}
          setRoute={setRoute}
          route={route}
        />

        <div
          className={`w-[100%] h-full bg-transparent mt-[80px] mx-auto px-6 min-h-[81.8vh]`}
        >
          <AllCourses />
        </div>
      </ProfessorProtected>
    </div>
  );
};

export default Page;
