"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";
import Protected from "../hooks/useProtected";
import ManagersAnalytics from "../components/analytics/ManagerAnalytics/ManagersAnalytics";
import UniversitiesAnalytics from "../components/analytics/ManagerAnalytics/UniversitiesAnalytics";
import FacultiesAnalytics from "../components/analytics/ManagerAnalytics/FacultiesAnalytics";
import DepartmentsAnalytics from "../components/analytics/ManagerAnalytics/DepartmentsAnalytics";
import ProfessorsAnalytics from "../components/analytics/ManagerAnalytics/ProfessorsAnalytics";
import StudentsAnalytics from "../components/analytics/ManagerAnalytics/StudentsAnalytics";
import CoursesAnalytics from "../components/analytics/CoursesAnalytics/ManagerCoursesAnalytics";
import ManagerHeader from "../components/analytics/Headers/ManagerHeader";
import UniversityHeader from "../components/analytics/Headers/UniversityHeader";

type Props = {};

const Page = ({}: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeManager, setActiveManager] = useState(0);
  const [activeUniversity, setActiveUniversity] = useState(0);

  return (
    <div>
      <Protected>
        <Heading
          title="Home | ELearning"
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
        <div className="manager">
          {user.role === "manger" && (
            <div className={``}>
              <ManagerHeader
                active={activeManager}
                setActive={setActiveManager}
              />
            </div>
          )}
          {user?.role === "manger" && (
            <div className="min-h-[85.5vh] !px-2 mb-6">
              {activeManager === 0 && (
                <div>
                  <ManagersAnalytics />
                </div>
              )}
              {activeManager === 1 && (
                <div>
                  <UniversitiesAnalytics />
                </div>
              )}
              {activeManager === 2 && (
                <div>
                  <FacultiesAnalytics />
                </div>
              )}
              {activeManager === 3 && (
                <div>
                  <DepartmentsAnalytics />
                </div>
              )}
              {activeManager === 4 && (
                <div>
                  <ProfessorsAnalytics />
                </div>
              )}
              {activeManager === 5 && (
                <div>
                  <StudentsAnalytics />
                </div>
              )}
              {activeManager === 6 && (
                <div>
                  <CoursesAnalytics />
                </div>
              )}
            </div>
          )}

          {user?.role === "faculty" && (
            <div className="min-h-[85.5vh]">Faculty Home</div>
          )}
          {user?.role === "department" && (
            <div className="min-h-[85.5vh]">Department Home</div>
          )}
          {user?.role === "professor" && (
            <div className="min-h-[85.5vh]">Professor Home</div>
          )}
          {user?.role === "student" && (
            <div className="min-h-[85.5vh]">
              <CourseCard user={user} />
            </div>
          )}
        </div>
        <div className="university">
          {user.role === "university" && (
            <div className={``}>
              <UniversityHeader
                active={activeUniversity}
                setActive={setActiveUniversity}
              />
            </div>
          )}
        </div>
      </Protected>
    </div>
  );
};

export default Page;
