"use client";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import React, { FC, useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { redirect } from "next/navigation";
import StudentProtected from "../hooks/studentProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

import DashboardHeader from "../components/manger/DashboardHeader";
type Props = {};

const Page: FC<Props> = ({}) => {
  return (
    <>
      <StudentProtected>
        <div>
          <Heading
            title={`Ai Test | ELearning`}
            description="LMS is a platform for students to learn and get help from teachers"
            keywords="Programming, Science, Languages,etc"
          />
          <DashboardHeader />
          <div className="min-h-[66.9vh] mt-[150px] mx-8">
            <iframe
              src="https://huggingface.co/chat/"
              frameborder="0"
              width="100%"
              height="560"
            ></iframe>
            <br />
            <br />
            <br />
            <iframe
              src="https://www.llama2.ai/"
              frameborder="0"
              width="100%"
              height="560"
            ></iframe>
          </div>
          <Footer />
        </div>
      </StudentProtected>
    </>
  );
};

export default Page;

//   src="https://www.llama2.ai/"
//   src="https://huggingface.co/chat/"
