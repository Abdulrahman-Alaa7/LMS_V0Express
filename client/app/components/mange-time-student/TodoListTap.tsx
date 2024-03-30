"use client";
import React, { useState } from "react";
import CreateNewTask from "./todo-list/components/CreateNewTask/CreateNewTask";
import Progress from "./todo-list/components/Progress/Progress";
import dynamic from "next/dynamic";

const TodayTasks = dynamic(
  () => import("./todo-list/components/TodayTasks/TodayTasks")
);
const CompletedTasks = dynamic(
  () => import("./todo-list/components/CompletedTasks/CompletedTasks")
);
type Props = {};

const TodoListTap = (props: Props) => {
  return (
    <div className={`todo-list-app !w-full min-h-[100vh]`}>
      <section className="content ">
        <CreateNewTask />
        <TodayTasks />
        <div className="divider bg-[#ccc] dark:bg-[#24293f]" />
        <Progress />
        <CompletedTasks />
      </section>
    </div>
  );
};

export default TodoListTap;
