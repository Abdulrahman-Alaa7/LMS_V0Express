"use client";
import React, { FC } from "react";
import { RiNotificationBadgeFill } from "react-icons/ri";

type Props = {
  openNotification: boolean;
};

const NotificationMenu: FC<Props> = ({ openNotification }) => {
  return (
    <div
      className={`w-[350px]  min-h-[50vh] max-h-[62vh] overflow-y-auto  border border-[#9e9e9e29] dark:bg-[#151a37] bg-white shadow-xl absolute top-[4.4rem] 800px:right-14 right-4 z-50 rounded `}
    >
      <h5
        className={`text-center text-[18px] font-semibold text-black dark:text-white py-2 border-b border-b-[#9e9e9e29] mb-3`}
      >
        Notifications
      </h5>

      {/* <div
        className={`dark:bg-[#9e9e9e29] bg-[#9e9e9e29] p-2 border-b dark:border-b-[#9e9e9e29] border-b-[#9e9e9e29] mx-2 rounded-lg mb-2`}
      >
        <div className={`w-full flex items-center justify-between p-1`}>
          <p className={`text-black dark:text-white font-semibold`}>
            Title Noti
          </p>
          <p
            className={`text-black dark:text-white cursor-pointer text-[12px] hover:bg-[#9e9e9e29] p-1 rounded transition`}
            // onClick={() => handleNotificationStatusChange(item._id)}
          >
            Mark as read
          </p>
        </div>
        <p className={`px-2 text-gray-500 dark:text-gray-300 text-[14px] `}>
          Noti content
        </p>
        <p className={`px-2  dark:text-gray-500 text-[14px] text-gray-400`}>
          just now
        </p>
      </div> */}
      <p className="text-center flex items-center justify-center flex-col gap-4 my-6">
        <RiNotificationBadgeFill size={50} className="text-gray-500" />
        <span className="text-gray-500"> No notification yet.</span>
      </p>
    </div>
  );
};

export default NotificationMenu;
