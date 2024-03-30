"use client";
import React, { useState } from "react";
import { styles } from "../styles/style";
import AdminProtected from "../hooks/adminProtected";
import { useSelector } from "react-redux";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import AllUsersuniversity from "../components/manger/AllUsersuniversity/AllUsersUniversity";
import SignUPUniversity from "../components/manger/CreateUniversity/SignUpUniversity";
import { FaPeopleRoof } from "react-icons/fa6";

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
          <AllUsersuniversity isSignUp={true} />
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
