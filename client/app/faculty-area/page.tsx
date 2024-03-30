"use client";
import React, { useState } from "react";
import { styles } from "../styles/style";
import { useSelector } from "react-redux";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import SignUpFaculty from "../components/university/CreateFaculty/SignUpFaculty";
import AllUsersFaculty from "../components/university/AllUsersFaculty/AllUsersFaculty";
import UniversityProtected from "../hooks/universityProtected";
import { LiaUniversitySolid } from "react-icons/lia";

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <UniversityProtected>
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
        <div className={`w-full  h-full bg-transparent mt-[80px] mx-auto`}>
          <AllUsersFaculty isSignUp={true} />
        </div>
      </UniversityProtected>
    </div>
  );
};

export default Page;
