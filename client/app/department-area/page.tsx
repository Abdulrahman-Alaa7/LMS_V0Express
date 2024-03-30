"use client";
import React, { useState } from "react";
import { styles } from "../styles/style";
import { useSelector } from "react-redux";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import FacultyProtected from "../hooks/facultyProtected";
import SignUpDepartment from "../components/faculty/CreateDepartment/SignUpDepartment";
import AllUsersDepartment from "../components/faculty/AllUsersDepartment/AllUsersDepartment";
import { BsBuildingsFill } from "react-icons/bs";

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <FacultyProtected>
        <Heading
          title={`${user?.name} | Mange ELeraning`}
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

        <div className={`w-full h-full bg-transparent mt-[80px] mx-auto`}>
          <AllUsersDepartment isSignUp={true} />
        </div>
      </FacultyProtected>
    </div>
  );
};

export default Page;
