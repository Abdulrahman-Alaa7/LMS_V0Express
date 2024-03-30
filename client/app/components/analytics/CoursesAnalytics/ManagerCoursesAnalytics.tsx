"use client";
import React, { FC, useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  LabelList,
  Tooltip,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import { useGetAllCoursesForProfessorQuery } from "../../../../redux/features/courses/courseApi";
import { styles } from "../../../styles/style";
import { SiBookstack } from "react-icons/si";

type Props = {};

const CoursesAnalytics: FC<Props> = ({}) => {
  const { data: AllCourses, isLoading: CoursesLoading } =
    useGetAllCoursesForProfessorQuery({});
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {CoursesLoading ? (
            <Loader />
          ) : (
            <div
              className={`bg-[#9e9e9e29] dark:bg-[#222c43] w-fit mx-auto px-12 py-3 rounded-lg flex flex-col justify-center items-center`}
            >
              <SiBookstack
                size={60}
                className="bg-[#9e9e9e29] p-2 rounded-full my-2"
              />
              <div>
                <div className="my-2 flex justify-between items-center gap-10">
                  <div className="flex flex-col justify-center items-center">
                    <p className=" font-semibold text-[30px]">
                      {AllCourses?.courses.length}
                    </p>
                    <p className={` text-[16px] text-[#666]`}>Total Cousrses</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className={`mt-[50px] dark:bg-[#222c43] shadow-sm pb-5 rounded-sm`}
          >
            <div className={`!ml-8 mb-5`}>
              <h1 className={`${styles.title} !text-[20px] px-5 !text-start `}>
                Courses Analytics
              </h1>
              <p className={`${styles.label} px-5 font-semibold`}>
                Last 12 months analytics data
              </p>
            </div>

            <div className={`w-full h-[30vh] flex items-center justify-center`}>
              <ResponsiveContainer width={`100%`} height={`100%`}>
                <BarChart width={150} height={300} data={analyticsData}>
                  <XAxis dataKey={`name`}>
                    <Label offset={0} position={`insideBottom`} />
                  </XAxis>
                  <YAxis domain={[minValue, "auto"]} />
                  <Tooltip labelClassName="dark:text-[#000]" />
                  <Bar dataKey={`count`} fill={`#3faf82`}>
                    <LabelList dataKey={`count`} position={`top`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CoursesAnalytics;
