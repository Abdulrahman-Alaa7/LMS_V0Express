"use client";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import CourseStudentCard from "../components/student/Courses/CourseStudentCard";
import StudentProtected from "../hooks/studentProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";

type Props = {};

const Page: FC<Props> = ({}) => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  return (
    <div className="min-h-screen">
      <StudentProtected>
        <Heading
          title={`${user?.name} Courses| ELearning`}
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
        <CourseStudentCard user={user} />
      </StudentProtected>
    </div>
  );
};

export default Page;
