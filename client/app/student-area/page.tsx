"use client";
import React, { useState } from "react";
import { styles } from "../styles/style";
import { useSelector } from "react-redux";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import DepartmentProtected from "../hooks/departmentProtected";
import StudyYearsHeader from "../components/StudtYearsHeader";
import FirstYearStudent from "../components/department/FisrtYearStudents/FisrtYearStudent";
import SecondYearStudent from "../components/department/SecondYearStudents/SecondYearStudents";
import ThirdYearStudent from "../components/department/ThirdYearStudents/ThirdYearStudents";
import FourthYearStudent from "../components/department/FourthYearStudents/FourthYearStudents";
import FifthYearStudent from "../components/department/FifthYearStudents/FifthYearStudents";
import SixthYearStudent from "../components/department/SixthYearStudents/SixthYearStudents";
import SeventhYearStudent from "../components/department/SeventhYearStudent/SeventhYearStudent";

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [active, setActive] = useState(0);

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
        <div className={``}>
          <StudyYearsHeader active={active} setActive={setActive} />
        </div>
        {active === 0 && (
          <div className={`min-h-[70.2vh] `}>
            <FirstYearStudent />
          </div>
        )}
        {active === 1 && (
          <div className={`min-h-[70.2vh] `}>
            <SecondYearStudent />
          </div>
        )}
        {active === 2 && (
          <div className={`min-h-[70.2vh] `}>
            <ThirdYearStudent />
          </div>
        )}
        {active === 3 && (
          <div className={`min-h-[70.2vh] `}>
            <FourthYearStudent />
          </div>
        )}
        {active === 4 && (
          <div className={`min-h-[70.2vh] `}>
            <FifthYearStudent />
          </div>
        )}
        {active === 5 && (
          <div className={`min-h-[70.2vh] `}>
            <SixthYearStudent />
          </div>
        )}
        {active === 6 && (
          <div className={`min-h-[70.2vh] `}>
            <SeventhYearStudent />
          </div>
        )}
      </DepartmentProtected>
    </div>
  );
};

export default Page;
