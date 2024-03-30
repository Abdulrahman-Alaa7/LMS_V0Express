"use client";
import React, { useState } from "react";
import { styles } from "../styles/style";
import { useSelector } from "react-redux";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { LiaUsersSolid } from "react-icons/lia";
import DepartmentProtected from "../hooks/departmentProtected";
import SignUpProfessor from "../components/department/CraeteProfessor/SignUpProfessor";
import AllUsersProfessor from "../components/department/AllUsersProfessors/AllUsersProfessor";

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <DepartmentProtected>
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
          <AllUsersProfessor isSignUp={true} />
        </div>
      </DepartmentProtected>
    </div>
  );
};

export default Page;
