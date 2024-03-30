"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import Swal from "sweetalert2";

type Context = {
  taskList: Task[];
  setTaskList: (taskList: Task[]) => void;
  progressBarValue: number;
  handleTaskDelete: (id: number) => void;
  handleAddTask: (taskName: string) => void;
  handleTaskChange: (id: number, done: boolean) => void;
  handleTaskNewVlaue: (id: number, newTaskName: string) => void;
  handleDeleteAllCompletedTasks: () => void;
  inputValue: number;
  setInputValue: any;
  initialTime: number;
  percentage: number;
  handleOnSubmit: (e: any) => void;
  handleFinish: () => void;
  isPaused: boolean;
  togglePause: () => void;
  timeRun: boolean;
  totalTimeElapsedToady: number;
  percentageDailyGoal: number;
  edit: boolean;
  setEdit: any;
  goal: number;
  setGoal: any;
  handleSaveGoal: () => void;
};

type Props = {
  children: ReactNode;
};

type Task = {
  id: number;
  name: string;
  done: boolean;
};

export const AppContext = createContext<Context>({} as Context);

export const AppStorage = ({ children }: Props) => {
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const data =
      typeof window !== "undefined" && localStorage.getItem("taskList");
    return data ? JSON.parse(data) : [];
  });
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [inputValue, setInputValue] = useState<any>(25);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [timeRun, setTimeRun] = useState<boolean>(false);
  const [totalTimeElapsedToady, setTotalTimeElapsedToday] = useState<number>(0);
  const [percentageDailyGoal, setPercentageDailyGoal] = useState<number>(0);
  const [edit, setEdit] = useState(false);
  const [goal, setGoal] = useState<any>(0);
  const realGoal: any = goal * 60 * 60;

  useEffect(() => {
    const LastValue: any =
      typeof window !== "undefined" && localStorage.getItem("TimeInSecond");
    const realInitial: any =
      typeof window !== "undefined" && localStorage.getItem("endTime");
    const pausedState: any =
      typeof window !== "undefined" && localStorage.getItem("isPaused");
    const timeRunLocal: any =
      typeof window !== "undefined" && localStorage.getItem("TimeRun");
    const totalTime: any =
      typeof window !== "undefined" && localStorage.getItem("totalTimeElapsed");
    const GoalValue: any =
      typeof window !== "undefined" && localStorage.getItem("DailyGoal");

    if (LastValue) {
      setInputValue(parseInt(LastValue) / 60 || 25);
    }
    if (realInitial) {
      setInitialTime(parseInt(realInitial) || 0);
    }
    if (pausedState) {
      setIsPaused(JSON.parse(pausedState) || false);
    }

    if (timeRunLocal) {
      setTimeRun(JSON.parse(timeRunLocal) || false);
    }
    if (totalTime) {
      setTotalTimeElapsedToday(parseInt(totalTime) || 0);
    }
    if (GoalValue) {
      setGoal(GoalValue / 60 / 60 || 8);
      const totalTimeToday: any = localStorage.getItem("totalTimeElapsed");
      const dailyGoal: any = localStorage.getItem("DailyGoal");
      const percentageDailyGoal =
        ((0 - totalTimeToday) / (0 - dailyGoal)) * 100;
      setPercentageDailyGoal(Math.floor(percentageDailyGoal));
    }
  }, []);

  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(1, 0, 0, 0);

    const intervalId = setInterval(() => {
      if (new Date() >= midnight) {
        setTotalTimeElapsedToday(0);
        localStorage.removeItem("totalTimeElapsed");

        midnight.setDate(midnight.getDate() + 1);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (initialTime > 0 && !isPaused) {
        const intervalId = setInterval(() => {
          setInitialTime((prevTime) => {
            if (prevTime <= 0) {
              clearInterval(intervalId);
              localStorage.removeItem("endTime");
              setIsPaused(false);
              localStorage.setItem("isPaused", JSON.stringify(false));
              return 0;
            }
            localStorage.setItem("endTime", (prevTime - 1).toString());
            if (prevTime === 1 && !isPaused) {
              localStorage.setItem("TimeRun", JSON.stringify(false));
              setTimeRun(false);
              Swal.fire({
                title: "Great job!",
                text: "Do you want to continue",
                icon: "success",
                html: `
    You want <b>to continue</b>,
    <a href="/mange-time" class="text-blue-500  underline">Mange time</a>.
  `,
                confirmButtonText: "ok",
              });
            }
            return prevTime - 1;
          });
          setTotalTimeElapsedToday((prevTotalTime) => prevTotalTime + 1);
          localStorage.setItem(
            "totalTimeElapsed",
            (totalTimeElapsedToady + 1).toString()
          );
        }, 1000);
        const realTime: any = localStorage.getItem("TimeInSecond");
        const percentageRemaining =
          ((0 - initialTime) / (0 - parseInt(realTime))) * 100;
        setPercentage(percentageRemaining);

        const totalTimeToday: any = localStorage.getItem("totalTimeElapsed");
        const dailyGoal: any = localStorage.getItem("DailyGoal");
        const percentageDailyGoal =
          ((0 - totalTimeToday) / (0 - dailyGoal)) * 100;
        setPercentageDailyGoal(Math.floor(percentageDailyGoal));
        return () => clearInterval(intervalId);
      }
    }
  }, [initialTime, isPaused, timeRun]);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const endTime = inputValue * 60;
    setInitialTime(endTime);
    localStorage.setItem("endTime", endTime.toString());
    localStorage.setItem("TimeInSecond", endTime.toString());
    setIsPaused(false);
    localStorage.setItem("TimeRun", JSON.stringify(true));
    setTimeRun(true);
  };

  const handleFinish = () => {
    setInitialTime(0);
    localStorage.removeItem("endTime");
    setPercentage(0);
    setIsPaused(false);
    localStorage.setItem("isPaused", JSON.stringify(false));
    localStorage.setItem("TimeRun", JSON.stringify(false));
    setTimeRun(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    localStorage.setItem("isPaused", JSON.stringify(!isPaused));
  };

  const handleSaveGoal = () => {
    if (realGoal === 0) {
      alert("Goal must greater than 0");
    } else {
      localStorage.setItem("DailyGoal", realGoal);
      const totalTimeToday: any = localStorage.getItem("totalTimeElapsed");
      const dailyGoal: any = localStorage.getItem("DailyGoal");
      const percentageDailyGoal =
        ((0 - totalTimeToday) / (0 - dailyGoal)) * 100;
      setPercentageDailyGoal(Math.floor(percentageDailyGoal));
    }
  };

  {
    /*End Pomodoro app */
  }

  const handleTaskDelete = (id: number) => {
    const newTaskList = taskList
      .filter((task) => task.id !== id)
      .map((task, index) => {
        task.id = index + 1;
        return task;
      });
    setTaskList(newTaskList);
  };

  const handleDeleteAllCompletedTasks = () => {
    const newTaskList = taskList.filter((task) => !task.done);
    setTaskList(newTaskList);
  };

  const handleAddTask = (taskName: string) => {
    const newTaskList = [...taskList];
    newTaskList.push({
      id: taskList.length + 1,
      name: taskName,
      done: false,
    });
    setTaskList(newTaskList);
  };

  const handleTaskChange = (id: number, done: boolean) => {
    const newTaskList = [...taskList];
    newTaskList.forEach((task) => {
      if (task.id === id) {
        task.done = done;
      }
    });
    setTaskList(newTaskList);
  };

  const handleTaskNewVlaue = (id: number, newTaskName: string) => {
    const newTaskList = [...taskList];
    newTaskList.forEach((task) => {
      if (task.id === id) {
        task.name = newTaskName;
      }
    });
    setTaskList(newTaskList);
  };

  useEffect(() => {
    const handleProgressChange = () => {
      if (taskList.length) {
        const completedTasks = taskList.filter((task) => task.done);
        const progressBarValue = Number(
          ((completedTasks.length * 100) / taskList.length).toFixed()
        );
        setProgressBarValue(progressBarValue);
      } else setProgressBarValue(0);
    };

    handleProgressChange();
  }, [taskList]);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <AppContext.Provider
      value={{
        taskList,
        setTaskList,
        progressBarValue,
        handleTaskDelete,
        handleAddTask,
        handleTaskChange,
        handleTaskNewVlaue,
        handleDeleteAllCompletedTasks,
        inputValue,
        setInputValue,
        initialTime,
        percentage,
        handleOnSubmit,
        handleFinish,
        isPaused,
        togglePause,
        timeRun,
        totalTimeElapsedToady,
        percentageDailyGoal,
        edit,
        setEdit,
        goal,
        setGoal,
        handleSaveGoal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
