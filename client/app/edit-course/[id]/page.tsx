"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "../../utils/Heading";
import ProfessorProtected from "../../hooks/professorProtected";
import EditCourse from "../../components/professor/InfoCourses/EditCourse";

type Props = {};

const Page: FC<Props> = ({ params }: any) => {
  const id = params?.id;
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <ProfessorProtected>
        <Heading
          title={`Edit Course`}
          description="LMS is a platform for students to learn and get help from teachers"
          keywords="Programming, Science, Languages,etc"
        />

        <div className={`w-[100%] h-full bg-transparent mt-[80px] mx-auto`}>
          <EditCourse id={id} />{" "}
        </div>
      </ProfessorProtected>
    </div>
  );
};

export default Page;
