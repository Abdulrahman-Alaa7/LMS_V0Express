"use client";
import React, { FC, useState, useEffect } from "react";
import CourseOptions from "./CourseOptions";
import CourseInformations from "./CourseInformations";
import CourseContent from "./CourseContent";
import { useCreateCourseMutation } from "../../../../redux/features/courses/courseApi";
import toast from "react-hot-toast";
import CourseQuiz from "./CourseQuiz";
import CoursePdf from "./CoursePdf";
import CoursePreview from "./CoursePreview";
import { useLoadUserQuery } from "../../../../redux/features/api/apiSlice";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import Loader from "../../Loader/Loader";

type Props = {};
const CreateCourse: FC<Props> = ({}) => {
  const [active, setActive] = useState(0);
  const [courseData, setCourseData] = useState({});
  const { data: userData } = useLoadUserQuery(undefined, {});

  const [CreateCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      //  redirect("/courses");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);

  const [courseInfo, setCourseInfo] = useState({
    courseTitle: "",
    yearOfStudy: "",
    semester: "",
    price: "",
    subscribersNumber: "0",
    private: false,
  });

  const [courseContentData, setCourseContentData] = useState([
    {
      title: "Untitled document",
      content: [
        {
          id: "1",
          type: ELEMENT_PARAGRAPH,
          children: [{ text: "Type here.." }],
        },
      ],
      exercise: [],
    },
  ]);

  const [courseQuiz, setCourseQuiz] = useState([
    {
      quiz: [],
    },
  ]);

  const [coursePdfInfo, setCoursePdfInfo] = useState({
    coursePdf: "",
    pdfName: "",
  });

  const handleSubmit = async () => {
    // Format course content array
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        title: courseContent.title,
        content: courseContent.content.map((content) => content),
        exercise: courseContent.exercise.map((item: any) => ({
          question: item.question,
          answers: item.answers.map((answer: any) => ({
            answer: answer.answer,
          })),
          correctChoice: item.correctChoice,
        })),
      })
    );

    // Format course quiz array
    const formattedCourseQuiz = courseQuiz.map((courseQuiz) => ({
      quiz: courseQuiz.quiz.map((item: any) => ({
        question: item.question,
        answers: item.answers.map((answer: any) => ({
          answer: answer.answer,
        })),
        correctChoice: item.correctChoice,
      })),
    }));

    // Prepare our data object
    const data = {
      user: userData?.user,
      courseTitle: courseInfo.courseTitle,
      yearOfStudy: courseInfo.yearOfStudy,
      semester: courseInfo.semester,
      price: courseInfo.price,
      subscribersNumber: courseInfo.subscribersNumber,
      private: courseInfo.private,
      courseData: formattedCourseContentData,
      quiz: formattedCourseQuiz,
      coursePdf: coursePdfInfo.coursePdf,
      pdfName: coursePdfInfo.pdfName,
      totalPages: courseContentData.length,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    if (!isLoading) {
      await CreateCourse(data);
    }
  };

  return (
    <div className="flex flex-col relative">
      {isLoading && (
        <div className="absolute top-8  left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <Loader />
        </div>
      )}
      <div
        className={`w-[100%] fixed flex justify-center items-center top-3 z-40`}
      >
        <CourseOptions active={active} setActive={setActive} />
      </div>
      <div className={`w-full flex flex-col min-h-[90%]`}>
        <div className={`min-h-[90.9vh] w-[100%]`}>
          {active === 0 && (
            <CourseInformations
              active={active}
              setActive={setActive}
              courseInfo={courseInfo}
              setCourseInfo={setCourseInfo}
            />
          )}
          {active === 1 && (
            <CourseContent
              active={active}
              setActive={setActive}
              courseContentData={courseContentData}
              setCourseContentData={setCourseContentData}
              handleSubmit={handleSubmit}
            />
          )}
          {active === 2 && (
            <CourseQuiz
              active={active}
              setActive={setActive}
              courseQuiz={courseQuiz}
              setCourseQuiz={setCourseQuiz}
              handleSubmit={handleSubmit}
            />
          )}
          {active === 3 && (
            <CoursePdf
              active={active}
              setActive={setActive}
              coursePdfInfo={coursePdfInfo}
              setCoursePdfInfo={setCoursePdfInfo}
              handleSubmit={handleSubmit}
            />
          )}
          {active === 4 && (
            <CoursePreview
              active={active}
              setActive={setActive}
              courseData={courseData}
              handleCourseCreate={handleCourseCreate}
              isEdit={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
