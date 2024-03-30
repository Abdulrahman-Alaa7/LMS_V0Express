"use client";
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { styles } from "../../../styles/style";
import { format } from "timeago.js";
import { IoCloseOutline } from "react-icons/io5";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../payment/CheckOutForm";
import { useLoadUserQuery } from "../../../../redux/features/api/apiSlice";
import DefaultAvatar from "../../../public/assets/avatar.png";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { Button } from "../../plate-ui/button";
import { IoChevronBack } from "react-icons/io5";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setOpen: any;
};

const CourseDetails: FC<Props> = ({
  data,
  stripePromise,
  clientSecret,
  setOpen: openAuthModel,
}) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [open, setOpen] = useState(false);

  // Check if the user already purchased this course or not
  const isPurchased =
    userData?.user &&
    userData?.user?.courses?.find((item: any) => item._id === data._id);

  const handlerSubmit = (e: any) => {
    if (userData?.user) {
      setOpen(true);
    }
  };

  // console.log(data);

  return (
    <div>
      <div className={`w-[90%] 800px:w-[90%] m-auto py-5`}>
        <Link href={`/profile`} passHref={true}>
          <IoChevronBack size={35} className={`${styles.BgHover}`} />
        </Link>
        <div
          className={`w-full flex !flex-col justify-center items-center gap-4`}
        >
          <SiBookstack size={150} className="mt-3 " /> <br />
          <h1 className={`text-2xl font-semibold`}>{data?.courseTitle}</h1>
          <h2 className={`text-xl text-gray-400 font-semibold my-3`}>
            {data?.user?.name}
          </h2>
          <div className={`flex items-center justify-between gap-4`}>
            <h3
              className={`text-lg font-semibold border p-2 rounded-lg w-[200px] text-center`}
            >
              {data?.user?.universityName}
            </h3>
            <h4
              className={`text-lg font-semibold border p-2 rounded-lg w-[200px] text-center`}
            >
              {data?.user?.facultyName}
            </h4>
          </div>
          <div className={`flex items-center justify-between gap-4`}>
            <h5
              className={`text-lg font-semibold border p-2 rounded-lg w-[200px]`}
            >
              {data?.user?.departmentName}
            </h5>
            <div
              className={`text-lg font-semibold border p-2 rounded-lg w-[200px] text-center`}
            >
              {data?.semester === 1 ? "First semester" : "Second semester"}
            </div>{" "}
          </div>
          <div
            className={`text-lg font-semibold border p-2 rounded-lg w-[300px] text-center`}
          >
            Price : {data?.price}
          </div>
          <Button
            type="button"
            onClick={handlerSubmit}
            className={`w-full 800px:w-[400px] dark:!bg-[#0096f0] dark:!text-white transition hover:opacity-[0.9] my-3`}
          >
            Buy Now
          </Button>
        </div>
      </div>
      <>
        {open && (
          <div
            className={`w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center`}
          >
            <div
              className={`w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3`}
            >
              <div className={`w-full flex justify-end`}>
                <IoCloseOutline
                  size={40}
                  className={`text-black cursor-pointer`}
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className={`w-full`}>
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm
                      setOpen={setOpen}
                      data={data}
                      user={userData?.user}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
