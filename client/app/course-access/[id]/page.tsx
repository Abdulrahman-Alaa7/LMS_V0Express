"use client";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import React, { FC, useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { redirect } from "next/navigation";
import StudentProtected from "../../hooks/studentProtected";
import Heading from "../../utils/Heading";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import { useGetCourseContentForValidUserQuery } from "../../../redux/features/courses/courseApi";
import CourseContentPage from "../../components/student/Courses/CourseContentPage";
import CourseHeader from "../../components/professor/Course/CourseHeader";
type Props = {
  params: any;
};

const Page: FC<Props> = ({ params }) => {
  const id = params.id;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});
  const { data: courseContent, isLoading: LoadingContent } =
    useGetCourseContentForValidUserQuery(id);

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.coursesPurchased?.find(
        (item: any) => item._id === id
      );

      if (!isPurchased) {
        redirect("/");
      }
    }

    if (error) {
      redirect("/");
    }
  }, [data, error]);

  return (
    <>
      <StudentProtected>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <Heading
              title={`${courseContent?.course?.courseTitle} | ELearning`}
              description="LMS is a platform for students to learn and get help from teachers"
              keywords="Programming, Science, Languages,etc"
            />
            <CourseHeader
              data={courseContent}
              params={params}
              isExercise={false}
            />
            <div>
              <CourseContentPage
                data={courseContent}
                isLoading={LoadingContent}
              />
            </div>
            <Footer />
          </div>
        )}
      </StudentProtected>
    </>
  );
};

export default Page;
