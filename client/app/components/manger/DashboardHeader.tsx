"use client";
import React, { FC, useState, useEffect } from "react";
import ThemeSwitcher from "../../utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
// import socketIO from "socket.io-client";
// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
// const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
// import {
//   useGetAllNotificationsQuery,
//   useUpdateNotificationStatusMutation,
// } from "../../../redux/features/notifications/notoficationsApi";
import { format } from "timeago.js";
import { ThemeToggle } from "../../utils/theme-toggle";

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const [notifications, setNotifications] = useState<any>([]);
  //   const { data, refetch } = useGetAllNotificationsQuery(undefined, {
  //     refetchOnMountOrArgChange: true,
  //   });
  //   const [updateNotificationStatus, { isSuccess }] =
  //     useUpdateNotificationStatusMutation();

  // const [audio] = useState(
  //   new Audio(
  //     "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3"
  //   )
  // );

  // const playerNotificationSound = () => {
  //   audio.play();
  // };

  //   useEffect(() => {
  //     if (data) {
  //       setNotifications(
  //         data.notifications.filter((item: any) => item.status === "unread")
  //       );
  //     }

  //     if (isSuccess) {
  //       refetch();
  //     }

  //     audio.load();
  //   }, [data, isSuccess]);

  //   useEffect(() => {
  //     socketId.on("newNotification", (data) => {
  //       refetch();
  //       playerNotificationSound();
  //     });
  //   }, []);

  //   const handleNotificationStatusChange = async (id: string) => {
  //     await updateNotificationStatus(id);
  //   };

  const [activeHead, setActiveHead] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActiveHead(true);
      } else {
        setActiveHead(false);
      }
    });
  }

  return (
    <div
      className={`flex items-center justify-end p-6 fixed top-0 right-0 z-50 bg-transparent h-[80px] `}
    >
      <ThemeToggle />
      <div
        className={`relative cursor-pointer m-2`}
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline
          className={`text-2xl cursor-pointer dark:text-white text-black`}
        />
        <span
          className={`absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] text-[12px] flex items-center justify-center text-white`}
        >
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div
          className={`w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 border border-[#ffffff0c] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-50 rounded`}
        >
          <h5
            className={`text-center text-[20px] font-Poppins text-black dark:text-white p-3`}
          >
            Notifications
          </h5>

          <div
            className={`dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]`}
          >
            <div className={`w-full flex items-center justify-between p-2`}>
              <p className={`text-black dark:text-white`}>title noti</p>
              <p
                className={`text-black dark:text-white cursor-pointer`}
                // onClick={() => handleNotificationStatusChange(item._id)}
              >
                Mark as read
              </p>
            </div>
            <p className={`px-2 text-black dark:text-white`}>
              {/* {item.message} */} Noti content
            </p>
            <p className={`px-2 text-black dark:text-white text-[14px]`}>
              {/* {format(item.createdAt)} */}
              just now
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
