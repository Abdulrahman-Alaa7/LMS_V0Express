"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../../plate-ui/button";
import StudentEditor from "../../StudentEditor";
import { FaFileCircleCheck } from "react-icons/fa6";
import { styles } from "../../../styles/style";
import { IoCloudDownload } from "react-icons/io5";
import Loader from "../../Loader/Loader";
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
import Quiz from "../Quiz";
const drawerWidth = 300; // 240

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type Props = {
  data: any;
  isLoading: any;
};

const CourseContentPage: FC<Props> = ({ data, isLoading }) => {
  const [activeContent, setActiveContent] = useState<any>(0);
  const theme = useTheme();
  const nextTheme = NextTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleContentClick = (index: any) => {
    setActiveContent(index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeContent]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className={`w-[100%] m-auto p-5 mb-5 relative min-h-[81.9vh]`}>
            <div className={`flex `}>
              <div className="w-[100%]">
                <Box sx={{ display: "flex" }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: "none" }) }}
                    className={`w-[40px] h-[40px] dark:hover:bg-[#9e9e9e29] z-50 !fixed top-6 `}
                  >
                    <MenuIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                  <Drawer
                    sx={{
                      width: drawerWidth,
                      flexShrink: 0,
                      "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor:
                          nextTheme.theme === "dark" ? "#151a37" : "#fff",
                      },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                  >
                    <DrawerHeader
                      className={`!flex !justify-between !items-center sticky top-0 left-0 right-0 z-50 dark:bg-[#151a37] bg-white pl-2 pr-2 border-b border-b-[#ccc] !w-[280px]`}
                    >
                      <h2 className="font-semibold text-[26px]  ml-3 dark:!text-white">
                        {data?.course.courseTitle.length > 15
                          ? `${data?.course.courseTitle.substring(0, 15)}...`
                          : data?.course.courseTitle}
                      </h2>
                      <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                          <ChevronLeftIcon className={`dark:!text-white`} />
                        ) : (
                          <ChevronRightIcon className={`dark:!text-white`} />
                        )}
                      </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                      {data?.course?.courseData?.map(
                        (course: any, index: number) => (
                          <ListItem key={index} disablePadding>
                            <ListItemButton
                              onClick={() => handleContentClick(index)}
                              className={`hover:!bg-[#9e9e9e29] !rounded-lg flex items-center gap-4 !mx-2 !my-1 ${activeContent === index && "!bg-[#9e9e9e29]"}`}
                            >
                              <ListItemText
                                primary={
                                  course.title.length > 27
                                    ? `${course.title.substring(0, 27)}...`
                                    : course.title
                                }
                                className={`dark:text-white `}
                              />
                            </ListItemButton>
                          </ListItem>
                        )
                      )}
                    </List>

                    <Divider />
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => setActiveContent("quiz")}
                          className={`hover:!bg-[#9e9e9e29] !rounded-lg flex items-center gap-4 !mx-2 !my-1 ${activeContent === "quiz" && "!bg-[#9e9e9e29]"}`}
                        >
                          {data?.course?.quiz[0].quiz.length > 0 && (
                            <ListItemText
                              className={`dark:text-white`}
                              primary={`Quiz`}
                            />
                          )}
                        </ListItemButton>
                        {data?.course?.coursePdf !== "" &&
                          data?.course?.coursePdf !== undefined && (
                            <ListItemButton
                              onClick={() => setActiveContent("coursePdf")}
                              className={`hover:!bg-[#9e9e9e29] !rounded-lg flex items-center gap-4 !mx-2 !my-1 ${activeContent === "coursePdf" && "!bg-[#9e9e9e29]"}`}
                            >
                              <ListItemText
                                className={`dark:text-white`}
                                primary={`Course Pdf`}
                              />
                            </ListItemButton>
                          )}
                      </ListItem>
                    </List>
                  </Drawer>
                  <Main open={open}>
                    <div className="w-[100%] ">
                      {activeContent !== "quiz" &&
                        activeContent !== "exercises" &&
                        activeContent !== "coursePdf" && (
                          <div>
                            <div>
                              <div>
                                <h1
                                  className={`text-[35px] p-6 font-semibold mx-8  mb-8 mt-2 border-b border-b-[#9e9e9e29]`}
                                >
                                  {
                                    data?.course?.courseData[activeContent]
                                      ?.title
                                  }
                                </h1>
                                <div>
                                  {data?.course?.courseData.map(
                                    (item: any, index: number) =>
                                      activeContent === index && (
                                        <div key={index}>
                                          <StudentEditor
                                            value={item?.content}
                                          />
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
                                                    (
                                                      answer: any,
                                                      index: number
                                                    ) => (
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
                                                  <a
                                                    href={`/course-access/exercise/${data?.course?._id}`}
                                                    target="_blank"
                                                  >
                                                    <Button
                                                      type="button"
                                                      className={`dark:bg-[#0095f6] dark:text-white`}
                                                    >
                                                      Start the exercise
                                                    </Button>
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                          <div
                                            className={`flex justify-between items-center w-full`}
                                          >
                                            <div
                                              className={`w-full select-none 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#0095f6] text-center text-[#fff] rounded cursor-pointer transition hover:opacity-[0.9]`}
                                              onClick={() => {
                                                if (index > 0) {
                                                  setActiveContent(index - 1);
                                                }
                                              }}
                                            >
                                              Prev
                                            </div>
                                            <div
                                              className={`w-full select-none 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#0095f6] text-center text-[#fff] rounded  cursor-pointer transition hover:opacity-[0.9]`}
                                              onClick={() => {
                                                if (
                                                  index !==
                                                  data?.course?.courseData
                                                    ?.length -
                                                    1
                                                ) {
                                                  setActiveContent(index + 1);
                                                }
                                              }}
                                            >
                                              Next
                                            </div>
                                          </div>
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
                          <Quiz data={data?.course} />
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
                                href={data?.course?.coursePdf?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`mb-4 ${styles.BgHover} cursor-pointer !w-[150px] flex items-center justify-center gap-3`}
                              >
                                <IoCloudDownload size={25} /> Download
                              </a>
                            </div>
                            <p
                              className={`bg-[#9e9e9e29] p-2  font-semibold rounded-md`}
                            >
                              {data?.course?.pdfName}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Main>
                </Box>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentPage;
