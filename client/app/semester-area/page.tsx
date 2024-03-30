"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import DepartmentProtected from "../hooks/departmentProtected";
import EditSemester from "../components/department/EditSemester";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <DepartmentProtected>
        <Heading
          title={`Semester Area | Mange ELeraning`}
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
        <div>
          <EditSemester />
        </div>
      </DepartmentProtected>
    </div>
  );
};

export default Page;
