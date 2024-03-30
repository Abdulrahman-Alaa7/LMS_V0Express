"use client";
import React, { FC, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTheme as NextTheme } from "next-themes";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

type Props = {
  data: any;
};
// Function to shuffle array
function shuffleArray(array: any[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const Quiz: FC<Props> = ({ data }) => {
  const [currentQuestion, setCurrentQuestion] = useState<any>(0);
  const [selectedChoice, setSelectedChoice] = useState<any>(null);
  const [showAnswer, setShowAnswer] = useState<any>(false);
  const [score, setScore] = useState<any>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsDataShuffled, setQuestionsDataShuffled] = useState<any[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(true);

  useEffect(() => {
    if (isTimeRunning) {
      const timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isTimeRunning]);

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return ` ${minutes < 10 ? "0" : ""}${minutes} : ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  useEffect(() => {
    const shuffledQuestions = data?.quiz[0]?.quiz.map((question: any) => {
      const shuffledChoices = shuffleArray([...question.answers]);
      const correctChoice = shuffledChoices.indexOf(
        question.answers[question.correctChoice]
      );
      return {
        ...question,
        answers: shuffledChoices,
        correctChoice: correctChoice,
      };
    });
    const shuffledQuestionsWithAnswers = shuffleArray(shuffledQuestions);

    setQuestionsDataShuffled(shuffledQuestionsWithAnswers);
    setCurrentQuestion(0); // Reset current question index when questions change
    setCurrentQuestionIndex(0); // Reset current question index when questions change
    setScore(0); // Reset score when questions change
    setTimeElapsed(0);
  }, [data?.quiz[0]?.quiz]);

  const currentQuestionData =
    questionsDataShuffled[currentQuestionIndex] || null;

  const handleAnswerClick = (choiceIndex: number) => {
    if (currentQuestionData) {
      setSelectedChoice(choiceIndex);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    if (currentQuestionData) {
      setShowAnswer(true);
      if (selectedChoice === currentQuestionData.correctChoice) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedChoice(null);
    setShowAnswer(false);
  };

  const totalQuestions = questionsDataShuffled.length;
  const correctAnswers = score;
  const incorrectAnswers = totalQuestions - score;
  let resultText: any = "";

  if (correctAnswers === totalQuestions) {
    resultText = (
      <span className="perfect">
        Perfect {correctAnswers} out of {totalQuestions}
      </span>
    );
  } else if (correctAnswers >= totalQuestions / 2) {
    resultText = (
      <span className="good">
        Good {correctAnswers} out of {totalQuestions}
      </span>
    );
  } else if (correctAnswers > 0) {
    resultText = (
      <span className="bad">
        Bad {correctAnswers} out of {totalQuestions}
      </span>
    );
  } else {
    resultText = (
      <span className="so-bad">
        So bad {correctAnswers} out of {totalQuestions}
      </span>
    );
  }

  const handleShowResults = () => {
    setIsTimeRunning(false);
  };

  //   console.log(questionsDataShuffled);

  return (
    <div>
      <div>
        <div>
          <div>
            <div>
              <div className="quiz-info dark:bg-[#16181d] !p-8 w-fit mx-auto rounded-lg">
                <div className="category !my-3">
                  Category : <span> {data?.courseTitle} Quiz</span>
                </div>
                <div className="count">
                  Questions Count : {totalQuestions}
                  <span></span>
                </div>
              </div>

              <div>
                <br />
                <br />
                <div className="exercises-page  mx-auto px-2">
                  <div className="quiz-app rounded-xl dark:bg-[#23272f]">
                    <div className="quiz-content">
                      <div
                        className={`quiz-area ${
                          currentQuestion === totalQuestions && "hidden"
                        } dark:bg-[#16181d] dark:text-white`}
                      >
                        {currentQuestionData ? (
                          <h2 className="text-xl ">{`${currentQuestion + 1} - ${
                            currentQuestionData.question
                          }`}</h2>
                        ) : (
                          ""
                        )}
                      </div>

                      <div
                        className={`answers-area ${
                          currentQuestion === totalQuestions && "hidden"
                        } dark:bg-[#16181d]`}
                      >
                        {currentQuestionData
                          ? currentQuestionData.answers.map(
                              (answer: any, index: number) => (
                                <div
                                  className={`answer ${
                                    showAnswer &&
                                    index === currentQuestionData.correctChoice
                                      ? "bg-[#059377] hover:bg-[#059377] border-b border-b-[#059377]"
                                      : showAnswer && selectedChoice === index
                                        ? "bg-[crimson] hover:bg-[crimson] border-b border-b-[crimson]"
                                        : "bg-[#f9f9f9] dark:bg-[#23272f] dark:border-b-[#23272f] hover:bg-[#9e9e9e29] dark:hover:opacity-[0.8] transition"
                                  }`}
                                  key={index}
                                >
                                  <input
                                    type="radio"
                                    name="question"
                                    id={`answer_${index}`}
                                    checked={selectedChoice === index}
                                    onChange={() => handleAnswerClick(index)}
                                    disabled={showAnswer}
                                  />
                                  <label
                                    className={` ${
                                      showAnswer &&
                                      index ===
                                        currentQuestionData.correctChoice
                                        ? "bg-[#059377]  !text-white after:hidden before:bg-[#059377] before:border-[#059377] flex items-center relative"
                                        : showAnswer && selectedChoice === index
                                          ? "bg-[crimson] !text-white after:hidden before:bg-[crimson] before:border-[crimson] flex items-center relative"
                                          : ""
                                    }`}
                                    htmlFor={`answer_${index}`}
                                  >
                                    {showAnswer &&
                                    index ===
                                      currentQuestionData.correctChoice ? (
                                      <span className="absolute -left-1 -top-1 border rounded-full border-[#fff]">
                                        <BsFillCheckCircleFill
                                          className="!text-[#059377]"
                                          size={25}
                                        />
                                      </span>
                                    ) : (
                                      showAnswer &&
                                      selectedChoice === index && (
                                        <span className="absolute -left-1 border -top-1 rounded-full border-[#fff]">
                                          <AiFillCloseCircle
                                            className="!text-[crimson]"
                                            size={25}
                                          />
                                        </span>
                                      )
                                    )}
                                    {answer?.answer}
                                  </label>
                                </div>
                              )
                            )
                          : ""}
                      </div>
                      <div
                        className={`time flex justify-end items-end py-2 px-3 border border-[#9e9e9e29] dark:border-[#9e9e9e29] w-fit mt-3 ml-auto rounded-xl ${
                          currentQuestion === totalQuestions && "hidden"
                        }`}
                      >
                        <p className="dark:text-white">
                          Time Elapsed : {formatTime(timeElapsed)}
                        </p>
                      </div>
                      <div className="submit">
                        {currentQuestion === totalQuestions ? (
                          <div className="results dark:bg-[#16181d] mt-3 dark:rounded-xl">
                            <h6 className="text-lg  dark:text-white py-1 px-3 border-r border-l border-t border-r-[#9e9e9e29] dark:border-r-[#9e9e9e29]  border-l-[#9e9e9e29] dark:border-l-[#9e9e9e29]  border-t-[#9e9e9e29] dark:border-t-[#9e9e9e29]  w-fit mx-auto rounded-t-xl">
                              Exercise Results
                            </h6>
                            <p className="p-2 text-lg dark:bg-[#23272f] border border-[#9e9e9e29] dark:border-[#9e9e9e29]  rounded-t-xl bg-white">
                              {resultText}
                            </p>
                            <div className="p-3 border-r border-l border-b border-r-[#9e9e9e29] dark:border-r-[#9e9e9e29] border-l-[#9e9e9e29] dark:border-l-[#9e9e9e29]  border-b-[#9e9e9e29] dark:border-b-[#9e9e9e29] rounded-b-xl">
                              <p className="text-blue-500 text-xl py-1">
                                Correct Answer : {correctAnswers}
                              </p>
                              <p className="text-[crimson] text-xl py-1">
                                Incorrect Answer : {incorrectAnswers}
                              </p>
                              <p className=" text-xl py-1 text-gray-500">
                                Time Elapsed : {formatTime(timeElapsed)}
                              </p>
                              <p className=" text-xl py-1 dark:text-white">
                                Total Questions : {totalQuestions}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <button
                            className={`submit-button ${
                              showAnswer ? "bg-[#0095f6]" : "bg-[#000]"
                            }`}
                            onClick={() => {
                              if (currentQuestion === totalQuestions - 1) {
                                handleShowAnswer();
                                handleShowResults();
                                handleNextQuestion();
                              } else if (showAnswer) {
                                handleNextQuestion();
                              } else {
                                handleShowAnswer();
                              }
                            }}
                            disabled={!showAnswer && selectedChoice === null}
                          >
                            {currentQuestion === totalQuestions - 1
                              ? "Result"
                              : showAnswer
                                ? "Next Answer"
                                : "Submit Answer"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
