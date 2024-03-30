"use client";
import React, { FC, useState, useEffect } from "react";
import StudentProtected from "./../hooks/studentProtected";
import Heading from "./../utils/Heading";
import GeminiAiChat from "../components/chatAi/GeminiAiChat";

type Props = {};

const Page: FC<Props> = ({}) => {
  return (
    <div>
      <StudentProtected>
        <Heading
          title={`Chat Ai | ELearning`}
          description="LMS is a platform for students to learn and get help from teachers"
          keywords="Programming, Science, Languages,etc"
        />

        <div className="main-ai">
          <GeminiAiChat />
        </div>
      </StudentProtected>
    </div>
  );
};

export default Page;
