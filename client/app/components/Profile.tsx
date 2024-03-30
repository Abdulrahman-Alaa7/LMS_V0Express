"use client";
import React, { FC, useState, useEffect } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogoutQuery } from "../../redux/features/auth/authApi";
import ProfileInfo from "./manger/ProfileInfo";
import ChangePassword from "./manger/ChangePassword";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import ProfileInfoUniversity from "./university/ProfileInfoUniversity";
import ChangePasswordUniversity from "./university/ChangePasswordUniversity";
import ProfileInfoFaculty from "./faculty/ProfileInfoFaculty";
import ChangePasswordFaculty from "./faculty/ChangePasswordFaculty";
import ProfileInfoDepartment from "./department/ProfileInfoDepartment";
import ChangePasswordDepartment from "./department/ChangePasswordDepartment";
import ProfileInfoProfessor from "./professor/ProfileInfoProfessor";
import ChangePasswordProfessor from "./professor/ChangePasswordProfessor";
import ProfileInfoStudent from "./student/ProfileInfoStudent";
import ChangePasswordStudent from "./student/ChangePasswordStudent";
import CourseStudentCard from "./student/Courses/CourseStudentCard";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);

  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    window.location.reload();
    redirect("/");
  };

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
    <div className={`w-[100%] flex mx-auto`}>
      {/* <div
        className={`w-[60px] 800px:w-[310px] h-[520px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm mt-[80px] mb-[88px] sticky ${
          scroll ? "top-[120px]" : "top-[10px]}"
        } left-[10px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          avatar={avatar}
          logOutHandler={logOutHandler}
        />
      </div> */}
      {active === 1 && user?.role === "manger" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 1 && user?.role === "university" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <ProfileInfoUniversity avatar={avatar} user={user} />
        </div>
      )}
      {active === 1 && user?.role === "faculty" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <ProfileInfoFaculty avatar={avatar} user={user} />
        </div>
      )}
      {active === 1 && user?.role === "department" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <ProfileInfoDepartment avatar={avatar} user={user} />
        </div>
      )}
      {active === 1 && user?.role === "professor" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <ProfileInfoProfessor avatar={avatar} user={user} />
        </div>
      )}
      {active === 1 && user?.role === "student" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <ProfileInfoStudent avatar={avatar} user={user} />
        </div>
      )}

      {active === 2 && user?.role === "manger" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <ChangePassword user={user} />
        </div>
      )}
      {active === 2 && user?.role === "university" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <ChangePasswordUniversity user={user} />
        </div>
      )}
      {active === 2 && user?.role === "faculty" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <ChangePasswordFaculty user={user} />
        </div>
      )}
      {active === 2 && user?.role === "department" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <ChangePasswordDepartment user={user} />
        </div>
      )}
      {active === 2 && user?.role === "professor" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <ChangePasswordProfessor user={user} />
        </div>
      )}
      {active === 2 && user?.role === "student" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <ChangePasswordStudent user={user} />
        </div>
      )}
      {active === 3 && user?.role === "student" && (
        <div className={`w-full h-full bg-transparent mt-[80px]`}>
          <CourseStudentCard user={user} />
        </div>
      )}
    </div>
  );
};

export default Profile;
