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
  AreaChart,
  Tooltip,
  Area,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetFacultiesAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import { useGetAllUsersFacultyQuery } from "../../../../redux/features/users/userFacultyApi";
import { styles } from "../../../styles/style";
import { HiOutlineUsers } from "react-icons/hi2";
import AllUsersFaculty from "../../university/AllUsersFaculty/AllUsersFaculty";

type Props = {};

const FacultiesAnalytics: FC<Props> = ({}) => {
  const { data: FacultiesUsers, isLoading: FacultiesUsersLoading } =
    useGetAllUsersFacultyQuery({});
  const { data, isLoading } = useGetFacultiesAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {FacultiesUsersLoading ? (
            <Loader />
          ) : (
            <div
              className={`bg-[#9e9e9e29] dark:bg-[#222c43] w-fit mx-auto px-12 py-3 rounded-lg flex flex-col justify-center items-center`}
            >
              <HiOutlineUsers
                size={45}
                className="bg-[#9e9e9e29] p-2 rounded-full my-2"
              />
              <div>
                <div className="my-2 flex justify-between items-center gap-10">
                  <div className="flex flex-col justify-center items-center">
                    <p className=" font-semibold text-[30px]">
                      {FacultiesUsers?.users.length}
                    </p>
                    <p className={` text-[16px] text-[#666]`}>
                      Total Faculties
                    </p>
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
                Faculties Analytics
              </h1>

              <p className={`${styles.label} px-5 font-semibold`}>
                Last 12 months analytics data
              </p>
            </div>

            <div className={`w-full h-[30vh] flex items-center justify-center`}>
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <AreaChart
                  data={analyticsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey={`name`} />
                  <YAxis />
                  <Tooltip labelClassName="text-[#666]" />
                  <Area
                    type={`monotone`}
                    dataKey={`count`}
                    stroke={`#1976d2`}
                    fill={`#0095f6`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <AllUsersFaculty isSignUp={false} />
          </div>
        </>
      )}
    </>
  );
};

export default FacultiesAnalytics;
