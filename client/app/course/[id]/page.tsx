"use client";
import React, { FC, useState, useEffect } from "react";
import CourseDetailsPage from "../../components/student/Courses/CourseDetailsPage";
import StudentProtected from "../../hooks/studentProtected";
import Heading from "../../utils/Heading";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
type Props = {
  params: any;
};

const Page: FC<Props> = ({ params }) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <StudentProtected>
        <Heading
          title={`${user?.name} | ELearning`}
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
        <CourseDetailsPage id={params.id} />
        <Footer />
      </StudentProtected>
    </div>
  );
};

export default Page;
