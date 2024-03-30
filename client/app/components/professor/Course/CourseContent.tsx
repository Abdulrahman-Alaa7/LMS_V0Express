"use client";
import React, { FC, useState, useEffect } from "react";
import { styles } from "../../../styles/style";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import toast from "react-hot-toast";
import MyEditor from "../../plate-editor";
import { IoIosAddCircleOutline, IoIosArrowDown } from "react-icons/io";
import { GoChevronRight } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import Pagination from "../../Pagination";
import { Box, Button, Modal } from "@mui/material";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentDate: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [contentsPerPage] = useState(10);
  const [collapsedIndexes, setCollapsedIndexes] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(0);
  // Get current contents
  const indexOfLastContent = currentPage * contentsPerPage;
  const indexOfFirstContent = indexOfLastContent - contentsPerPage;

  const currentContents = courseContentData.slice(
    indexOfFirstContent,
    indexOfLastContent
  );

  // Function to change page
  const paginate = (pageNumber: number) => {
    const indexOfLastContent = pageNumber * contentsPerPage;
    const indexOfFirstContent = indexOfLastContent - contentsPerPage;
    const currentContents = courseContentData.slice(
      indexOfFirstContent,
      indexOfLastContent
    );

    // Check if the current page has content
    if (currentContents.length === 0 && pageNumber > 1) {
      setCurrentPage(pageNumber - 1); // Go to the previous page
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const [activeSection, setActiveSection] = useState(1);

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsedIndexes = [...collapsedIndexes];
    const indexInArray = updatedCollapsedIndexes.indexOf(index);
    if (indexInArray === -1) {
      updatedCollapsedIndexes.push(index);
    } else {
      updatedCollapsedIndexes.splice(indexInArray, 1);
    }
    setCollapsedIndexes(updatedCollapsedIndexes);
  };

  const handleRemoveQuestion = (index: number, exerciseIndex: number) => {
    setCourseContentData((prevData: any[]) => {
      const updatedData = JSON.parse(JSON.stringify(prevData));
      updatedData[index].exercise.splice(exerciseIndex, 1);
      return updatedData;
    });
  };

  const handleAddNewQuestion = (index: number) => {
    setCourseContentData((prevData: any[]) => {
      const updatedData = JSON.parse(JSON.stringify(prevData));
      updatedData[index].exercise.push({
        question: "",
        answers: [{ answer: "" }],
        correctChoice: "",
      });
      return updatedData;
    });
  };

  const addNewSection = () => {
    if (courseContentData[courseContentData.length - 1].title === "") {
      toast.error("Please fill all fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        title: "Untitled document",
        content: [
          {
            id: `${courseContentData.length + 1}`,
            type: ELEMENT_PARAGRAPH,
            children: [{ text: "Type here.." }],
          },
        ],
        exercise: [],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (courseContentData[courseContentData.length - 1].title !== "") {
      handleSubmit();
      setActive(active + 1);
    } else {
      toast.error("Section Can't be empty");
    }
  };

  const handleExerciseChange = (
    index: number,
    exerciseIndex: number,
    field: string,
    value: string
  ) => {
    setCourseContentData((prevData: any[]) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        exercise: updatedData[index].exercise.map((exercise: any, i: any) =>
          i === exerciseIndex ? { ...exercise, [field]: value } : exercise
        ),
      };
      return updatedData;
    });
  };

  const handleAddNewAnswer = (index: number, exerciseIndex: number) => {
    setCourseContentData((prevData: any[]) => {
      const updatedData = JSON.parse(JSON.stringify(prevData));
      const answers = updatedData[index].exercise[exerciseIndex].answers;
      if (answers.length < 4) {
        answers.push({ answer: "" });
      }
      return updatedData;
    });
  };

  const handleRemoveAnswer = (
    index: number,
    exerciseIndex: number,
    answerIndex: number
  ) => {
    setCourseContentData((prevData: any[]) => {
      const updatedData = JSON.parse(JSON.stringify(prevData));
      const answers = updatedData[index].exercise[exerciseIndex].answers;
      if (answers.length > 1) {
        answers.splice(answerIndex, 1);
      }
      return updatedData;
    });
  };

  const handleAnswerChange = (
    index: number,
    exerciseIndex: number,
    answerIndex: number,
    value: string
  ) => {
    setCourseContentData((prevData: any[]) => {
      const updatedData = [...prevData];
      updatedData[index].exercise[exerciseIndex].answers[answerIndex].answer =
        value;
      return updatedData;
    });
  };

  const handleDeleteSection = (index: number) => {
    if (index > 0) {
      const updateData = [...courseContentData];
      updateData.splice(index, 1);
      setCourseContentData(updateData);
    }
    setOpen(!open);
  };

  return (
    <div className={`w-[80%] m-auto p-2`}>
      <form onSubmit={handleSubmit}>
        {courseContentData
          ?.slice(indexOfFirstContent, indexOfLastContent)
          .map((item: any, trueIndex: number) => {
            const index = indexOfFirstContent + trueIndex;
            const isCollapsed = collapsedIndexes.includes(index);
            const showSectionInput =
              index === 0 || item.title !== courseContentData[index - 1].title;
            return (
              <div key={index}>
                <div
                  className={`w-full bg-[#9e9e9e29]  p-4 my-3 rounded-lg ${
                    showSectionInput ? "" : "mb-0"
                  }`}
                >
                  <div
                    className={`w-full flex justify-between items-center my-0`}
                  >
                    {!isCollapsed ? (
                      <>
                        {item.title ? (
                          <span
                            className={`font-Poppins dark:text-white text-black`}
                          >
                            <span className={`font-semibold`}>
                              {index + 1}.
                            </span>
                            <span className={`font-semibold`}>
                              {item.title}
                            </span>
                          </span>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <div></div>
                    )}
                    {/* Arrow button for collapsed  content */}
                    <div className={`flex items-center`}>
                      <AiOutlineDelete
                        className={`dark:text-white text-black text-[20px] mr-2 ${styles.BgHover} ${
                          index > 0 ? "cursor-pointer" : "cursor-no-drop"
                        }`}
                        size={33}
                        onClick={() => {
                          if (index > 0) {
                            setOpen(!open);
                            setDeleteIndex(index);
                          }
                        }}
                      />
                      {open && (
                        <div className="popup-container bg-white dark:bg-slate-900 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fixed rounded-md p-5 z-50">
                          <div className={`text-[20px] font-semibold my-3`}>
                            Are you sure you want to delete this section?
                          </div>
                          <div className="flex justify-between items-center mt-6 mb-2">
                            <button
                              className="bg-[#9e9e9e29] text-[16px] font-semibold text-black dark:text-white transition hover:opacity-[0.9] px-3 py-2 rounded-md"
                              onClick={() => setOpen(!open)}
                            >
                              Cancel
                            </button>
                            <button
                              className={`bg-[crimson] text-[16px] font-semibold text-white transition hover:opacity-[0.9] px-3 py-2 rounded-md`}
                              onClick={() => handleDeleteSection(deleteIndex)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                      <IoIosArrowDown
                        className={`dark:text-white text-black cursor-pointer ${styles.BgHover}`}
                        style={{
                          transform: isCollapsed
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                        size={35}
                        onClick={() => handleCollapseToggle(index)}
                      />
                    </div>
                  </div>
                  {isCollapsed && (
                    <>
                      <div className={`w-[100%] relative my-6`}>
                        <input
                          type="text"
                          placeholder=""
                          className={`${styles.SpInput} `}
                          value={item.title}
                          onChange={(e: any) => {
                            setCourseContentData((prevData: any[]) => {
                              const updatedData = [...prevData];
                              updatedData[index] = {
                                ...updatedData[index],
                                title: e.target.value,
                              };
                              return updatedData;
                            });
                          }}
                        />
                        <label
                          htmlFor=""
                          className={`${styles.SpLabel} !bg-[#efefef] dark:!bg-[#262b36]`}
                        >
                          Title
                        </label>
                      </div>
                      <div>
                        <MyEditor
                          courseContentData={courseContentData}
                          setCourseContentData={setCourseContentData}
                          index={index}
                          value={item.content}
                        />
                      </div>
                      <br />
                      <div>
                        {item?.exercise?.map(
                          (exercise: any, exerciseIndex: number) => (
                            <div className={`mb-3 block`} key={exerciseIndex}>
                              <div
                                className={`w-full flex items-center justify-between  border-t border-t-gray-300 dark:border-t-gray-600  my-6 pt-6`}
                              >
                                <label htmlFor="" className={`${styles.label}`}>
                                  Question {exerciseIndex + 1}
                                </label>
                                <AiOutlineDelete
                                  className={` cursor-pointer text-[crimson] text-[20px]`}
                                  onClick={() =>
                                    handleRemoveQuestion(index, exerciseIndex)
                                  }
                                />
                              </div>
                              <div className={`relative`}>
                                <input
                                  type="text"
                                  placeholder=""
                                  className={`${styles.SpInput} `}
                                  value={exercise.question}
                                  onChange={(e: any) =>
                                    handleExerciseChange(
                                      index,
                                      exerciseIndex,
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

                              {exercise?.answers?.map(
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
                                            exerciseIndex,
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
                                            handleAddNewAnswer(
                                              index,
                                              exerciseIndex
                                            )
                                          }
                                        />
                                        <AiOutlineDelete
                                          className={`cursor-pointer text-black dark:text-white text-[20px]`}
                                          onClick={() =>
                                            handleRemoveAnswer(
                                              index,
                                              exerciseIndex,
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
                                  value={exercise.correctChoice}
                                  onChange={(e: any) =>
                                    handleExerciseChange(
                                      index,
                                      exerciseIndex,
                                      "correctChoice",
                                      e.target.value
                                    )
                                  }
                                  name="select-correct-answer"
                                >
                                  {exercise.answers.length == 1 && (
                                    <>
                                      <option value="-1">
                                        Choose the correct choice
                                      </option>
                                      <option value="0">1</option>
                                    </>
                                  )}
                                  {exercise.answers.length == 2 && (
                                    <>
                                      <option value="-1">
                                        Choose the correct choice
                                      </option>
                                      <option value="0">1</option>
                                      <option value="1">2</option>
                                    </>
                                  )}
                                  {exercise.answers.length == 3 && (
                                    <>
                                      <option value="-1">
                                        Choose the correct choice
                                      </option>
                                      <option value="0">1</option>
                                      <option value="1">2</option>
                                      <option value="2">3</option>
                                    </>
                                  )}
                                  {exercise.answers.length == 4 && (
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
                          )
                        )}
                        <br />
                        {/* Add a new question */}
                        <div className={`inline-block mb-4`}>
                          <button
                            type="button"
                            className={`flex items-center text-[18px] dark:text-white text-black cursor-pointer  p-2 rounded-md`}
                            onClick={() => handleAddNewQuestion(index)}
                          >
                            <BsFillPatchQuestionFill
                              className={`mr-2`}
                              size={25}
                            />
                            {item?.exercise?.length === 0
                              ? "Add an exercise"
                              : "Add a new queston"}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {index == courseContentData.length - 1 && (
                  <div
                    className={`flex items-center text-[20px] dark:text-white text-black cursor-pointer mt-3`}
                    onClick={() => addNewSection()}
                  >
                    <AiOutlinePlusCircle className={`mr-2`} /> Add New Section
                  </div>
                )}
              </div>
            );
          })}
        <br />
      </form>
      <br />
      {courseContentData.length > 10 && (
        <div className="pagination flex justify-center items-center flex-wrap">
          <Pagination
            contentsPerPage={contentsPerPage}
            totalContents={courseContentData.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
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
  );
};
export default CourseContent;
