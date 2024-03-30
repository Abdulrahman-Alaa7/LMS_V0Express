"use client";
import React, { useState } from "react";
import { useGetUsersAllCoursesShallowQuery } from "../../redux/features/courses/courseApi";
import Link from "next/link";
import { SiBookstack } from "react-icons/si";
import Image from "next/image";
import { Keyboard, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Props = {
  user?: any;
};

const CourseCard = ({ user }: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesShallowQuery(undefined, {});
  const [courses, setCourses] = useState<any[]>([]);

  const dataCoursesId = data?.courses?.map((course: any) => course._id);
  const usersCoursesPurchased =
    user && user?.coursesPurchased?.map((item: any) => item._id);

  return (
    <div className="relative min-h-[83.9vh] mx-2 mt-12">
      <h2 className=" leading-[150%] font-semibold flex justify-center border p-2 rounded-full text-black dark:text-white mb-8 w-[50%] mx-auto text-[18px]">
        {data?.courses?.length} Courses for you
      </h2>
      <Swiper
        pagination={{
          clickable: true,
        }}
        navigation={true}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          950: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1424: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        keyboard={{
          enabled: true,
        }}
        modules={[Keyboard, Pagination, Navigation]}
        className="mySwiper "
      >
        {data?.courses?.map((course: any, index: number) => (
          <SwiperSlide
            key={index}
            className="relative flex  flex-col justify-center overflow-hidden bg-transparent min-h-[60vh] rounded-lg"
          >
            <div className="group 700:mx-1 mx-4 relative  overflow-hidden bg-white dark:bg-[#9e9e9e29] px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm rounded-lg sm:px-10 border border-[#9e9e9e29] dark:border-none">
              <span className="absolute top-10 left-1/2 -translate-x-1/2 z-0 h-20 w-20 rounded-full bg-[#9e9e9e29] dark:bg-[#151a37] transition-all duration-300 group-hover:scale-[12.3]"></span>
              <div className="relative z-10 mx-auto max-w-md flex flex-col justify-center items-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-[#9e9e9e29] dark:bg-[#151a37] transition-all duration-300 group-hover:bg-[#9e9e9e29] dark:group-hover:bg-[#151a37]">
                  <SiBookstack
                    size={40}
                    className="dark:text-white/90 text-black/90"
                  />
                </span>
                <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 dark:text-gray-200 transition-all duration-300 group-hover:text-black/90 dark:group-hover:text-white/90">
                  <h2
                    className={`font-semibold text-[18px] my-4 bg-[#9e9e9e29] px-4 py-1 rounded text-center`}
                  >
                    {course.courseTitle}
                  </h2>
                  <div
                    className={`flex items-center justify-center gap-4 mt-3`}
                  >
                    <img
                      src={course?.user?.avatar?.url}
                      alt="Professor-picture"
                      className={`w-[35px] h-[35px] rounded-full border border-gray-500 `}
                    />
                    <h3
                      className={`font-semibold text-[18px] text-[#000000c7] dark:text-gray-500 group-hover:text-black/90 dark:group-hover:text-white/90`}
                    >
                      {course?.user?.name}
                    </h3>
                  </div>
                </div>
                <div className="pt-5 text-base font-semibold leading-7">
                  <h2
                    className={`font-semibold text-[18px] my-6 bg-[#9e9e9e29] px-2 py-1 rounded-full flex items-center justify-center group-hover:text-black/90 dark:group-hover:text-white/90`}
                  >
                    Price : {course.price} EGP
                  </h2>
                  {usersCoursesPurchased.includes(course._id) ? (
                    <Link
                      href={`/course-access/${course._id}`}
                      className={`group-hover:text-white/90 px-4 py-1 rounded-full text-[15px] flex items-center justify-center font-semibold text-white transition hover:opacity-[0.8] !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    >
                      Enter to course
                    </Link>
                  ) : (
                    <Link
                      href={`/course/${course._id}`}
                      className={` !bg-[#0095f6] group-hover:text-white/90  px-4 py-1 rounded-full text-[15px] flex items-center justify-center font-semibold text-white transition hover:opacity-[0.8] !w-[180px] my-3 font-Poppins cursor-pointer`}
                    >
                      Buy Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CourseCard;
