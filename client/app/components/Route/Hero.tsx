"use client";
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
type Props = {};

const Hero: FC<Props> = (props) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      <div className={`w-full 1000px:flex items-center`}>
        <div
          className={`absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] hero_animation rounded-full mx-8`}
        ></div>

        <div
          className={`1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10`}
        >
          <Image
            src={require("../../../public/assets/banner-img-1.png")}
            alt="Banner"
            className={`object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-auto z-[10]`}
            width={400}
            height={400}
          />
        </div>

        <div
          className={`1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]`}
        >
          <h2
            className={`dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[70%]`}
          >
            Improve Your Online Learning Experience Better Instantly
          </h2>
          <br />
          <p
            className={`dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[66%] 1100px:!w-[70%]`}
          >
            Improve Your Online Learning Experience Better Instantly We have
            40k+ Online courses & 500K+ Online registered student. Find your
            desired Courses from them.
          </p>
          <br />
          <br />
          <div
            className={`1500px:w-[66%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative`}
          >
            <input
              type="search"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              placeholder="Search Courses..."
              className={`bg-transparent border dark:border-none dark:bg-[#1c1f26] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#000000ac] dark:text-[#ffffffe6] font-[500] text-[20px] font-josefin`}
            />
            <div
              className={`absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#0095f6] rounded-r-[5px]`}
              onClick={handleSearch}
            >
              <BiSearch className={`text-white`} size={30} />
            </div>
          </div>
          <br />
          <br />
          <div
            className={`1500px:w-[66%] 1100px:w-[78%] w-[90%] flex items-center`}
          >
            <Image
              src={require("../../../public/assets/client-1.jpg")}
              alt="client-1"
              className={`rounded-full`}
            />
            <Image
              src={require("../../../public/assets/client-2.jpg")}
              alt="client-2"
              className={`rounded-full ml-[-20px]`}
            />
            <Image
              src={require("../../../public/assets/client-3.jpg")}
              alt="client-3"
              className={`rounded-full ml-[-20px]`}
            />
            <p
              className={`font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600] ml-3`}
            >
              500K+ People already trusted us.
              <Link href={`/courses`} passHref className={` text-[crimson]`}>
                {" "}
                View Courses
              </Link>
            </p>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default Hero;
