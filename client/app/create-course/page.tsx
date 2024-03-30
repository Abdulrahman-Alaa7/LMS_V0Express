"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "../utils/Heading";
import ProfessorProtected from "../hooks/professorProtected";
import CreateCourse from "../components/professor/Course/CreateCourse";

type Props = {};

const Page: FC<Props> = () => {
  return (
    <div>
      <ProfessorProtected>
        <Heading
          title={`Create course | Dashboard ELeraning`}
          description="LMS is a platform for students to learn and get help from teachers"
          keywords="Programming, Science, Languages,etc"
        />

        <div className={`w-[100%] h-full bg-transparent mt-[80px] mx-auto`}>
          <CreateCourse />
        </div>
      </ProfessorProtected>
    </div>
  );
};

export default Page;
