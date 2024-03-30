"use client";
import React, { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { styles } from "../../../styles/style";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { IoIosAddCircleOutline, IoIosArrowDown } from "react-icons/io";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseQuiz: any;
  setCourseQuiz: (courseQuiz: any) => void;
  handleSubmit: any;
};

const CourseQuiz: FC<Props> = ({
  active,
  setActive,
  courseQuiz,
  setCourseQuiz,
  handleSubmit,
}) => {
  const handleRemoveQuestion = (index: number, quizIndex: number) => {
    setCourseQuiz((prevData: any[]) => {
      const updatedData = JSON.parse(JSON.stringify(prevData));
      updatedData[index].quiz.splice(quizIndex, 1);
      return updatedData;
    });
  };

  const handleAddNewQuestion = (index: number) => {
    setCourseQuiz((prevData: any[]) => {
      const updatedData = JSON.parse(JSON.stringify(prevData));
      updatedData[index].quiz.push({
        question: "",
        answers: [{ answer: "" }],
        correctChoice: "",
      });
      return updatedData;
    });
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (courseQuiz[courseQuiz.length - 1].question !== "") {
      handleSubmit();
      setActive(active + 1);
    } else {
      toast.error("Section Can't be empty");
    }
  };

  const handleQuizChange = (
    index: number,
    quizIndex: number,
    field: string,
    value: string
  ) => {
    setCourseQuiz((prevData: any[]) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        quiz: updatedData[index].quiz.map((quiz: any, i: any) =>
          i === quizIndex ? { ...quiz, [field]: value } : quiz
        ),
      };
      return updatedData;
    });
  };

  const handleAddNewAnswer = (index: number, quizIndex: number) => {
    setCourseQuiz((prevData: any[]) => {
      const updatedData = JSON.parse(JSON.stringify(prevData));
      const answers = updatedData[index].quiz[quizIndex].answers;
      if (answers.length < 4) {
        answers.push({ answer: "" });
      }
      return updatedData;
    });
  };

  const handleRemoveAnswer = (
    index: number,
    quizIndex: number,
    answerIndex: number
  ) => {
    setCourseQuiz((prevData: any[]) => {
      const updatedData = JSON.parse(JSON.stringify(prevData));
      const answers = updatedData[index].quiz[quizIndex].answers;
      if (answers.length > 1) {
        answers.splice(answerIndex, 1);
      }
      return updatedData;
    });
  };

  const handleAnswerChange = (
    index: number,
    quizIndex: number,
    answerIndex: number,
    value: string
  ) => {
    setCourseQuiz((prevData: any[]) => {
      const updatedData = [...prevData];
      updatedData[index].quiz[quizIndex].answers[answerIndex].answer = value;
      return updatedData;
    });
  };

  return (
    <div>
      {" "}
      <div className={`w-[80%] m-auto p-2`}>
        <form onSubmit={handleSubmit}>
          {courseQuiz?.map((item: any, index: number) => {
            const showSectionInput =
              index === 0 || item.question !== courseQuiz[index - 1].question;
            return (
              <div
                key={index}
                className={`w-full bg-[#9e9e9e29]  p-4 my-3 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                <>
                  {item?.quiz?.map((quiz: any, quizIndex: number) => (
                    <div className={`mb-3 block`} key={quizIndex}>
                      <div
                        className={`w-full flex items-center justify-between ${quizIndex > 0 && "border-t border-t-gray-300 dark:border-t-gray-600 "}  my-6 pt-6`}
                      >
                        <label htmlFor="" className={`${styles.label}`}>
                          Question {quizIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`cursor-pointer text-[crimson] text-[20px]`}
                          onClick={() => handleRemoveQuestion(index, quizIndex)}
                        />
                      </div>
                      <div className={`relative`}>
                        <input
                          type="text"
                          placeholder=""
                          className={`${styles.SpInput} `}
                          value={quiz.question}
                          onChange={(e: any) =>
                            handleQuizChange(
                              index,
                              quizIndex,
                              "question",
                              e.target.value
                            )
                          }
                        />
                        <label
                          htmlFor=""
                          className={`${styles.SpLabel} !bg-[#efefef] dark:!bg-[#1e2025]`}
                        >
                          Write a question
                        </label>
                      </div>

                      {quiz?.answers?.map(
                        (answer: any, answerIndex: number) => (
                          <div
                            className={`mb-3 block ${styles.label} bg-[#9e9e9e29]  my-3 p-2 rounded-lg `}
                            key={answerIndex}
                          >
                            <div className={`relative`}>
                              <input
                                type="text"
                                placeholder=""
                                className={`${styles.SpInput}`}
                                value={answer.answer}
                                onChange={(e: any) => {
                                  handleAnswerChange(
                                    index,
                                    quizIndex,
                                    answerIndex,
                                    e.target.value
                                  );
                                }}
                              />
                              <label
                                htmlFor=""
                                className={`${styles.SpLabel} !bg-[#e2e2e2] dark:!bg-[#323336]`}
                              >
                                Write an answer
                              </label>
                            </div>
                            <div
                              className={`w-full flex items-center justify-between`}
                            >
                              <label
                                htmlFor=""
                                className={`${styles.label} text-black dark:text-white`}
                              >
                                Answer {answerIndex + 1}
                              </label>
                              <div className="flex items-center gap-2">
                                <IoIosAddCircleOutline
                                  className={`${
                                    answerIndex === 3
                                      ? "cursor-no-drop"
                                      : "cursor-pointer"
                                  } text-black dark:text-white my-3`}
                                  size={22}
                                  onClick={() =>
                                    handleAddNewAnswer(index, quizIndex)
                                  }
                                />
                                <AiOutlineDelete
                                  className={`cursor-pointer text-black dark:text-white text-[20px]`}
                                  onClick={() =>
                                    handleRemoveAnswer(
                                      index,
                                      quizIndex,
                                      answerIndex
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )
                      )}

                      <div className={`mt-4 w-full  mx-auto relative`}>
                        <IoIosArrowDown
                          size={20}
                          className={`absolute right-4 top-4 `}
                        />
                        <select
                          className={`${styles.SpInput} dark:bg-slate-900 font-Popins cursor-pointer`}
                          value={quiz.correctChoice}
                          onChange={(e: any) =>
                            handleQuizChange(
                              index,
                              quizIndex,
                              "correctChoice",
                              e.target.value
                            )
                          }
                          name="select-correct-answer"
                        >
                          {quiz.answers.length == 1 && (
                            <>
                              <option value="-1">
                                Choose the correct choice
                              </option>
                              <option value="0">1</option>
                            </>
                          )}
                          {quiz.answers.length == 2 && (
                            <>
                              <option value="-1">
                                Choose the correct choice
                              </option>
                              <option value="0">1</option>
                              <option value="1">2</option>
                            </>
                          )}
                          {quiz.answers.length == 3 && (
                            <>
                              <option value="-1">
                                Choose the correct choice
                              </option>
                              <option value="0">1</option>
                              <option value="1">2</option>
                              <option value="2">3</option>
                            </>
                          )}
                          {quiz.answers.length == 4 && (
                            <>
                              <option value="-1">
                                Choose the correct choice
                              </option>
                              <option value="0">1</option>
                              <option value="1">2</option>
                              <option value="2">3</option>
                              <option value="3">4</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  ))}
                  <br />
                  {/* Add new question */}
                  <div className={`inline-block mb-4`}>
                    <button
                      type="button"
                      className={`flex items-center text-[18px] dark:text-white text-black cursor-pointer  p-2 rounded-md`}
                      onClick={() => handleAddNewQuestion(index)}
                    >
                      <BsFillPatchQuestionFill className={`mr-2`} size={25} />
                      {item?.quiz?.length === 0
                        ? "Add a quiz"
                        : "Add a new queston"}
                    </button>
                  </div>
                </>

                <br />
              </div>
            );
          })}{" "}
          <br />
        </form>
        <br />
        <div
          className={`w-[80%] flex items-center justify-between mx-auto fixed bottom-0 p-2 bg-white dark:bg-[#020305] z-50 h-[60px]`}
        >
          <button
            type="button"
            className="flex justify-center items-center  w-[80px] h-[40px]  bg-[#0095f6] text-center text-white rounded-full cursor-pointer transition hover:opacity-[0.8]"
            onClick={() => prevButton()}
          >
            <GoChevronLeft size={35} />
          </button>
          <button
            type="submit"
            className="flex justify-center items-center  w-[80px] h-[40px]  bg-[#0095f6] text-center text-white rounded-full cursor-pointer transition hover:opacity-[0.8]"
            onClick={() => handleOptions()}
          >
            <GoChevronRight size={35} />
          </button>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default CourseQuiz;
