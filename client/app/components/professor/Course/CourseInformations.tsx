"use client";
import React, { FC, useState, useEffect } from "react";
import { styles } from "../../../styles/style";
import { IoIosArrowDown } from "react-icons/io";
import { useLoadUserQuery } from "../../../../redux/features/api/apiSlice";
import { useGetAllUsersDepartmentProfQuery } from "../../../../redux/features/users/userProfessorApi";
import Link from "next/link";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformations: FC<Props> = ({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}) => {
  const [isSubNum, setIsSubNum] = useState(false);
  const { data: DepartmentData } = useGetAllUsersDepartmentProfQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { data: userData } = useLoadUserQuery(undefined, {});

  const matchUser = DepartmentData?.users?.filter(
    (user: any) => user?._id === userData?.user?.userCreatedById
  );

  const result = matchUser && matchUser.length > 0 ? matchUser[0] : null;

  const year1 = result?.yearOne?.yearId;
  const year2 = result?.yearTwo?.yearId;
  const year3 = result?.yearThree?.yearId;
  const year4 = result?.yearFour?.yearId;
  const year5 = result?.yearFive?.yearId;
  const year6 = result?.yearSix?.yearId;
  const year7 = result?.yearSeven?.yearId;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  return (
    <div className={`w-[80%] m-auto `}>
      <Link href={`/home`} className="flex !w-[40px] mt-16">
        <GoChevronLeft size={40} className={`${styles.BgHover}`} />
      </Link>
      <div className={`mt-10`}>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="relative title-input">
              <input
                type="text"
                name="title"
                required
                value={courseInfo?.courseTitle}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, courseTitle: e.target.value })
                }
                id="title"
                placeholder=""
                className={`${styles.SpInput}`}
              />
              <label htmlFor="title" className={`${styles.SpLabel}`}>
                Course title
              </label>
            </div>
          </div>
          <br />
          <div className={`w-full flex justify-between`}>
            <div className={`w-[50%]`}>
              <div className={`mt-4 w-full  mx-auto relative`}>
                <IoIosArrowDown
                  size={20}
                  className={`absolute right-4 top-4 `}
                />
                <select
                  className={`${styles.SpInput} dark:bg-slate-900 font-Popins cursor-pointer `}
                  value={courseInfo?.yearOfStudy}
                  onChange={(e: any) =>
                    setCourseInfo({
                      ...courseInfo,
                      yearOfStudy: e.target.value,
                    })
                  }
                  name="select-year"
                >
                  {result?.yearsOfStudy === 1 && (
                    <>
                      <option value={`0`}>Choose the year</option>
                      <option value={year1}>First year</option>
                    </>
                  )}
                  {result?.yearsOfStudy === 2 && (
                    <>
                      <option value={`0`}>Choose the year</option>
                      <option value={year1}>First year</option>
                      <option value={year2}>Second year</option>
                    </>
                  )}
                  {result?.yearsOfStudy === 3 && (
                    <>
                      <option value={`0`}>Choose the year</option>
                      <option value={year1}>First year</option>
                      <option value={year2}>Second year</option>
                      <option value={year3}>Third year</option>
                    </>
                  )}
                  {result?.yearsOfStudy === 4 && (
                    <>
                      <option value={`0`}>Choose the year</option>
                      <option value={year1}>First year</option>
                      <option value={year2}>Second year</option>
                      <option value={year3}>Third year</option>
                      <option value={year4}>Fourth year</option>
                    </>
                  )}
                  {result?.yearsOfStudy === 5 && (
                    <>
                      <option value={`0`}>Choose the year</option>
                      <option value={year1}>First year</option>
                      <option value={year2}>Second year</option>
                      <option value={year3}>Third year</option>
                      <option value={year4}>Fourth year</option>
                      <option value={year5}>Fifth year</option>
                    </>
                  )}
                  {result?.yearsOfStudy === 6 && (
                    <>
                      <option value={`0`}>Choose the year</option>
                      <option value={year1}>First year</option>
                      <option value={year2}>Second year</option>
                      <option value={year3}>Third year</option>
                      <option value={year4}>Fourth year</option>
                      <option value={year5}>Fifth year</option>
                      <option value={year6}>Sixth year</option>
                    </>
                  )}
                  {result?.yearsOfStudy === 7 && (
                    <>
                      <option value={`0`}>Choose the year</option>
                      <option value={year1}>First year</option>
                      <option value={year2}>Second year</option>
                      <option value={year3}>Third year</option>
                      <option value={year4}>Fourth year</option>
                      <option value={year5}>Fifth year</option>
                      <option value={year6}>Sixth year</option>
                      <option value={year7}>Seventh year</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            <div className={`w-[45%]`}>
              <div className={`mt-4 w-full  mx-auto relative`}>
                <IoIosArrowDown
                  size={20}
                  className={`absolute right-4 top-4 `}
                />
                <select
                  className={`${styles.SpInput} dark:bg-slate-900 font-Popins cursor-pointer`}
                  value={courseInfo.semester}
                  onChange={(e: any) =>
                    setCourseInfo({ ...courseInfo, semester: e.target.value })
                  }
                  name="select-semester"
                >
                  <option value="0">Choose the semester</option>
                  <option value="1">Semester one</option>
                  <option value="2">Semester two</option>
                </select>
              </div>
            </div>
          </div>

          <div className={`w-full flex justify-between mt-10 gap-4`}>
            <div className={`w-[35%]`}>
              <div className="relative mt-5 price-input mb-2">
                <input
                  type="number"
                  name="price"
                  required
                  value={courseInfo.price}
                  onChange={(e: any) =>
                    setCourseInfo({
                      ...courseInfo,
                      price: e.target.value,
                    })
                  }
                  id="price"
                  placeholder=""
                  className={`${styles.SpInput}`}
                />
                <label htmlFor="price" className={`${styles.SpLabel}`}>
                  Price
                </label>
              </div>
            </div>
            <div className={`w-[35%] `}>
              {/* <div className="relative top-[-16px]">
              <label
                className="inline-flex items-center cursor-pointer absolute"
                htmlFor="subNum"
              >
                <input
                  type="checkbox"
                  name="subNum"
                  id="subNum"
                  className="w-5 h-5 text-[#0095f6]  rounded-md focus:outline-none focus:ring-0 cursor-pointer"
                  onClick={() => setIsSubNum(true)}
                />
                <span className="ml-2 select-none cursor-pointer text-[#666] dark:text-[#ddd]">
                  SubScribers number required
                </span>
              </label>
            </div> */}
              <div className={`relative mt-5 price-input mb-2 `}>
                <input
                  type="number"
                  name="subsNum"
                  value={courseInfo.subscribersNumber}
                  onChange={(e: any) =>
                    setCourseInfo({
                      ...courseInfo,
                      subscribersNumber: e.target.value,
                    })
                  }
                  id="subsNum"
                  placeholder=""
                  className={`${styles.SpInput}`}
                />
                <label htmlFor="subsNum" className={`${styles.SpLabel}`}>
                  SubScribers number (optional)
                </label>
              </div>
            </div>
            <div className={`w-[30%] `}>
              <div className={`mt-5 w-full  mx-auto relative mb-2`}>
                <IoIosArrowDown
                  size={20}
                  className={`absolute right-4 top-4 `}
                />
                <select
                  className={`${styles.SpInput} dark:bg-slate-900 font-Popins cursor-pointer`}
                  value={courseInfo.private}
                  onChange={(e: any) =>
                    setCourseInfo({ ...courseInfo, private: e.target.value })
                  }
                  name="select-privacy"
                >
                  <option value="false">public</option>
                  <option value="true">Private</option>
                </select>
              </div>
            </div>
          </div>

          <br />

          <div className={`w-full flex items-center justify-end `}>
            <button
              type="submit"
              className="flex justify-center items-center  w-[80px] h-[40px] bg-[#0095f6] text-center text-white rounded-full mt-8 cursor-pointer transition hover:opacity-[0.8]"
            >
              <GoChevronRight size={35} />
            </button>
          </div>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

export default CourseInformations;
