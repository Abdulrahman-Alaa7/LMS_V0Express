"use client";
import React, { FC, useEffect, useState } from "react";
import { useGetUsersAllCoursesShallowQuery } from "../../../../redux/features/courses/courseApi";
import Loader from "../../Loader/Loader";
import { SiBookstack } from "react-icons/si";
import Link from "next/link";

type Props = {
  user?: any;
};

const CourseStudentCard: FC<Props> = ({ user }) => {
  const { data, isLoading } = useGetUsersAllCoursesShallowQuery(undefined, {});
  const [courses, setCourses] = useState<any[]>([]);

  const usersCoursesPurchased =
    user && user?.coursesPurchased?.map((item: any) => item._id);

  const purchasedCourses = data?.courses?.filter((course: any) =>
    usersCoursesPurchased.includes(course._id)
  );

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`mx-6 mt-20 grid grid-cols-1 gap-[10px] 800px:grid-cols-2 800px:gap-[25px] 1100px:grid-cols-3 1100px:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0`}
        >
          {purchasedCourses.map((course: any, index: number) => (
            <div
              key={index}
              className="!flex !flex-col !items-center !justify-center  my-3 border border-gray-300 dark:border-gray-600 rounded-lg p-4 "
            >
              <SiBookstack size={100} className="mt-3" /> <br />
              <h2
                className={`font-semibold text-[18px] my-4 bg-[#9e9e9e29] px-4 py-1 rounded`}
              >
                {course.courseTitle}
              </h2>
              <div className={`flex items-center justify-center gap-4 mt-3`}>
                <img
                  src={course?.user?.avatar?.url}
                  alt="Professor-picture"
                  className={`w-[35px] h-[35px] rounded-full border border-gray-500 `}
                />
                <h3
                  className={`font-semibold text-[18px] text-[#000000c7] dark:text-gray-500`}
                >
                  {course?.user?.name}
                </h3>
              </div>
              {/* <h2
                className={`font-semibold text-[18px] my-4 bg-[#9e9e9e29] px-2 py-1 rounded flex gap-1 items-center`}
              >
                Price : {course.price}
              </h2> */}{" "}
              <br />
              {usersCoursesPurchased.includes(course._id) ? (
                <Link
                  href={`/course-access/${course._id}`}
                  className={` px-4 py-2 rounded-full flex items-center justify-center font-semibold text-white transition hover:opacity-[0.8] !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                >
                  Enter to course
                </Link>
              ) : (
                <Link
                  href={`/course/${course._id}`}
                  className={` !bg-[#0095f6] text-white px-3 py-2 rounded-lg`}
                >
                  Buy Now
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseStudentCard;
