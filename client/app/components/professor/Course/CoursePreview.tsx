"use client";
import React, { FC, useState } from "react";
import { SiBookstack } from "react-icons/si";
import { Button } from "../../plate-ui/button";
import StudentEditor from "../../StudentEditor";
import { FaFileCircleCheck } from "react-icons/fa6";
import { styles } from "../../../styles/style";
import { IoCloudDownload } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit,
}) => {
  const [activeContent, setActiveContent] = useState<any>(-1);

  const handleContentClick = (index: any) => {
    setActiveContent(index);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  // console.log(courseData);

  return (
    <div className={`w-[90%] m-auto py-5 mb-5 relative`}>
      <div className={`flex `}>
        <div className="w-[20%] bg-[#9e9e9e29] p-4 min-h-[699px] max-h-[700px] overflow-auto sticky top-24 rounded-lg">
          <h2 className="font-semibold text-[26px] mb-3">
            {courseData.courseTitle}
          </h2>
          <ul>
            <li
              className={`cursor-pointer text-[18px] px-3 ${
                activeContent === -1
                  ? "text-blue-500 bg-[#9e9e9e29]"
                  : "transition hover:bg-[#9e9e9e29]"
              }`}
              onClick={() => setActiveContent(-1)}
            >
              Preview Card
            </li>
            {courseData?.courseData?.map((course: any, index: number) => (
              <li
                key={index}
                className={`cursor-pointer text-[18px] px-3 ${
                  activeContent === index
                    ? "text-blue-500 bg-[#9e9e9e29]"
                    : "transition hover:bg-[#9e9e9e29] "
                }`}
                onClick={() => handleContentClick(index)}
              >
                {course.title.length > 24
                  ? `${course.title.substring(0, 24)}...`
                  : course.title}{" "}
              </li>
            ))}
          </ul>
          {courseData?.quiz[0].quiz.length > 0 ||
          courseData?.coursePdf !== "" ? (
            <h2 className="font-semibold text-[20px] my-3">More</h2>
          ) : (
            ""
          )}

          <ul>
            {courseData?.quiz[0].quiz.length > 0 && (
              <li
                className={`cursor-pointer text-[18px] px-3 ${
                  activeContent === "quiz"
                    ? "text-blue-500 bg-[#9e9e9e29]"
                    : "transition hover:bg-[#9e9e9e29]"
                }`}
                onClick={() => setActiveContent("quiz")}
              >
                Quiz
              </li>
            )}
            {courseData?.coursePdf !== "" &&
              courseData?.coursePdf !== undefined && (
                <li
                  className={`cursor-pointer text-[18px] px-3 ${
                    activeContent === "coursePdf"
                      ? "text-blue-500 bg-[#9e9e9e29]"
                      : "transition hover:bg-[#9e9e9e29]"
                  }`}
                  onClick={() => setActiveContent("coursePdf")}
                >
                  Course Pdf
                </li>
              )}
          </ul>
        </div>

        {/* Main content area */}
        <div className="w-[80%] p-4">
          {activeContent == -1 && (
            <div>
              <h2 className="text-[35px] p-6 font-semibold mx-8  mb-8 mt-2 border-b border-b-[#9e9e9e29]">
                Preview Card
              </h2>
              <div className="flex flex-col items-center justify-center  my-16 border border-gray-300 dark:border-gray-600 rounded-lg w-fit p-4 min-w-[300px] mx-auto">
                <SiBookstack size={100} className="mt-3" /> <br />
                <h2
                  className={`font-semibold text-[18px] my-4 bg-[#9e9e9e29] px-4 py-1 rounded`}
                >
                  {courseData.courseTitle}
                </h2>
                <div className={`flex items-center justify-center gap-4 mt-3`}>
                  <img
                    src={courseData?.user?.avatar?.url}
                    alt="Professor-picture"
                    className={`w-[35px] h-[35px] rounded-full border border-gray-500 `}
                  />
                  <h3
                    className={`font-semibold text-[18px] text-[#000000c7] dark:text-gray-500`}
                  >
                    {courseData?.user?.name}
                  </h3>
                </div>
                <h2
                  className={`font-semibold text-[18px] my-4 bg-[#9e9e9e29] px-2 py-1 rounded flex gap-1 items-center`}
                >
                  Price : {courseData.price}
                </h2>
                <Button
                  type="button"
                  className="!bg-[#0095f6] !text-white my-4"
                >
                  Subscribe Now
                </Button>
              </div>
            </div>
          )}

          {activeContent !== -1 &&
            activeContent !== "quiz" &&
            activeContent !== "exercises" &&
            activeContent !== "coursePdf" && (
              <div>
                <div>
                  <div>
                    <h1
                      className={`text-[35px] p-6 font-semibold mx-8  mb-8 mt-2 border-b border-b-[#9e9e9e29]`}
                    >
                      {courseData.courseData[activeContent]?.title}
                    </h1>
                    <div>
                      {courseData.courseData.map(
                        (item: any, index: number) =>
                          activeContent === index && (
                            <div key={index}>
                              <StudentEditor value={item?.content} />
                              <br />
                              <br />
                              {item?.exercise.length === 0 ? (
                                <div></div>
                              ) : (
                                <div className={`mt-10 mx-4`}>
                                  <h3
                                    className={`text-[30px] p-6 font-semibold mx-8 my-4 border-t border-t-[#9e9e9e29]`}
                                  >
                                    Exercise {item.title}
                                  </h3>
                                  <div className="exer-box-test mb-12 border  rounded w-full flex flex-col m">
                                    <h2 className="text-lg font-bold mb-3 bg-[#9e9e9e29] px-2 py-2 border-b ">
                                      {item?.exercise[0]?.question}
                                    </h2>
                                    <div className={`answers-area`}>
                                      {item?.exercise[0]?.answers?.map(
                                        (answer: any, index: number) => (
                                          <div
                                            className={`bg-[#f9f9f9] dark:bg-transparent  dark:hover:!bg-[#4078f23b]  hover:!bg-[#9e9e9e29] !flex p-4 !items-center !justify-center gap-2 
                                          `}
                                            key={index}
                                          >
                                            <input
                                              type="radio"
                                              name="question"
                                              id={`answer_${index}`}
                                              className="cursor-pointer"
                                            />
                                            <label
                                              className={`  !w-full block cursor-pointer 
                                            `}
                                              htmlFor={`answer_${index}`}
                                            >
                                              {answer.answer}
                                            </label>
                                          </div>
                                        )
                                      )}
                                    </div>

                                    <div className="flex justify-center items-center gap-4 py-2  w-fit mx-auto px-4 rounded-t-lg my-4">
                                      <Button
                                        type="button"
                                        className={`dark:bg-[#0095f6] dark:text-white`}
                                      >
                                        Start the exercise
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          {activeContent === "quiz" && (
            <>
              <h3
                className={`text-[30px] p-6 font-semibold mx-8 my-4 border-b border-b-[#9e9e9e29]`}
              >
                Quiz {courseData.courseTitle}
              </h3>
              {courseData?.quiz[0]?.quiz?.map((item: any, index: number) => (
                <div key={index}>
                  <div className={`mt-10 mx-4`}>
                    <div className="exer-box-test mb-12 border  rounded w-full flex flex-col m">
                      <h2 className="text-lg font-bold mb-3 bg-[#9e9e9e29] px-2 py-2 border-b ">
                        {index + 1} - {item.question}
                      </h2>
                      <div className={`answers-area`}>
                        {item?.answers?.map((answer: any, index: number) => (
                          <div
                            className={`bg-[#f9f9f9] dark:bg-transparent  dark:hover:!bg-[#4078f23b]  hover:!bg-[#9e9e9e29] !flex p-4 !items-center !justify-center gap-2 
                                          `}
                            key={index}
                          >
                            <input
                              type="radio"
                              name="question"
                              id={`answer_${index}`}
                              className="cursor-pointer"
                            />
                            <label
                              className={`  !w-full block cursor-pointer 
                                            `}
                              htmlFor={`answer_${index}`}
                            >
                              {answer.answer}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeContent === "coursePdf" && (
            <div>
              <div className=" flex flex-col items-center justify-center border border-blue-500 p-4 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                  <FaFileCircleCheck
                    size={120}
                    className={`mb-3 text-[#0095f6]`}
                  />
                  <a
                    href={courseData?.coursePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mb-4 ${styles.BgHover} cursor-pointer !w-[150px] flex items-center justify-center gap-3`}
                  >
                    <IoCloudDownload size={25} /> Download
                  </a>
                </div>
                <p className={`bg-[#9e9e9e29] p-2  font-semibold rounded-md`}>
                  {courseData?.pdfName}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`w-[90%] flex items-center justify-between mx-auto fixed bottom-0 px-2 pt-2 pb-3 bg-white dark:bg-[#020305] z-50 h-[60px]`}
      >
        <div
          className={`w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#0095f6] text-center text-[#fff] rounded cursor-pointer transition hover:opacity-[0.9]`}
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className={`w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#0095f6] text-center text-[#fff] rounded  cursor-pointer transition hover:opacity-[0.9]`}
          onClick={() => createCourse()}
        >
          {isEdit ? "Update" : "Craete"}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
