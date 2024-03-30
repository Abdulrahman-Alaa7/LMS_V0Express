"use client";
import React, { useState } from "react";
import SignUP from "../components/manger/AuthManger/SignUp";
import { FaUserCog } from "react-icons/fa";
import { styles } from "../styles/style";
import AdminProtected from "../hooks/adminProtected";
import { useSelector } from "react-redux";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import MangeTeam from "../components/manger/MangeTeam/MangeTeam";

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <AdminProtected>
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
          <MangeTeam isTeam={true} isSignup={true} />
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
