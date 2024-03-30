"use client";
import React, { FC, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Image from "next/image";
import avatar from "../../../public/assets/avatar.png";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { IoClose, IoVideocam } from "react-icons/io5";
import { RiSettingsFill } from "react-icons/ri";
import { PiChatTeardropDotsFill, PiSignOut } from "react-icons/pi";
import { useTheme as NextTheme } from "next-themes";
import Link from "next/link";
import { useLogoutQuery } from "../../../redux/features/auth/authApi";
import { redirect } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { MdAnalytics } from "react-icons/md";
import { GiBookshelf, GiSpellBook } from "react-icons/gi";
import { FaFileInvoice } from "react-icons/fa";

const drawerWidth = 300;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
type Props = {
  user: any;
  openSidebar: boolean;
  setOpenSidebar: (openSidebar: boolean) => void;
};

const SidebarProfessor: FC<Props> = ({ user, openSidebar, setOpenSidebar }) => {
  const theme = useTheme();
  const nextTheme = NextTheme();
  const [logout, setLogout] = useState(false);
  const [activeTap, setActiveTap] = useState(-1);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    window.location.reload();
    redirect("/");
  };

  const handleDrawerOpen = () => {
    setOpenSidebar(true);
  };

  const handleDrawerClose = () => {
    setOpenSidebar(false);
  };

  const currentPagePath = window.location.pathname;

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: nextTheme.theme === "dark" ? "#151a37" : "#fff",
            },
          }}
          variant="persistent"
          anchor="right"
          open={openSidebar}
        >
          <DrawerHeader
            className={`!flex !justify-between !items-center sticky top-0 left-0 right-0 z-50 dark:bg-[#151a37] bg-white pl-2 pr-2 border-b border-b-[#9e9e9e29] !w-[299px] `}
          >
            <Link
              href={`/profile`}
              className={`font-semibold dark:!text-white flex items-center gap-2 hover:bg-[#9e9e9e29] p-2 rounded-lg transition w-[85%] ${currentPagePath === "/profile" && "!bg-[#9e9e9e29]"} `}
              onClick={() => setActiveTap(0)}
            >
              <Image
                src={
                  user?.avatar || avatar ? user?.avatar?.url || avatar : avatar
                }
                alt=""
                className={`w-[30px] h-[30px] rounded-full`}
                width={30}
                height={30}
              />
              <h2 className="text-[14px]">{user?.name}</h2>
            </Link>
            <IconButton
              onClick={handleDrawerClose}
              className="hover:!bg-[#9e9e9e29]  w-[12%]"
            >
              <IoClose size={20} className="dark:text-white" />
            </IconButton>
          </DrawerHeader>
          <Divider className="!border-[#9e9e9e29]" />
          <List>
            <ListItem disablePadding>
              <Link href={`/home`} className="w-full">
                <ListItemButton
                  className={`hover:!bg-[#9e9e9e29] !rounded-lg flex items-center gap-4 !mx-2 !my-1  ${currentPagePath === "/home" && "!bg-[#9e9e9e29]"}`}
                >
                  <div>
                    <HiHome size={25} className="dark:text-gray-300" />
                  </div>
                  <ListItemText
                    primary={`Home`}
                    className={`dark:text-white  `}
                  />
                </ListItemButton>
              </Link>
            </ListItem>

            <Divider className="!border-[#9e9e9e29]" />
            <ListItem disablePadding>
              <Link href={`/all-courses`} className="w-full">
                <ListItemButton
                  className={`hover:!bg-[#9e9e9e29] !rounded-lg flex items-center gap-4 !mx-2 !my-1  ${currentPagePath === "/professor-area" && "!bg-[#9e9e9e29]"}`}
                >
                  <div>
                    <GiBookshelf size={25} className="dark:text-gray-300" />
                  </div>
                  <ListItemText
                    primary={`All Courses`}
                    className={`dark:text-white  `}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider className="!border-[#9e9e9e29]" />
            <ListItem disablePadding>
              <Link href={`/create-course`} className="w-full">
                <ListItemButton
                  className={`hover:!bg-[#9e9e9e29] !rounded-lg flex items-center gap-4 !mx-2 !my-1  ${currentPagePath === "/professor-area" && "!bg-[#9e9e9e29]"}`}
                >
                  <div>
                    <GiSpellBook size={25} className="dark:text-gray-300" />
                  </div>
                  <ListItemText
                    primary={`Create Course`}
                    className={`dark:text-white  `}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider className="!border-[#9e9e9e29]" />
            <ListItem disablePadding>
              <ListItemButton
                className={`hover:!bg-[#9e9e9e29] !rounded-lg flex items-center gap-4 !mx-2 !my-1  ${currentPagePath === "/invoices" && "!bg-[#9e9e9e29]"}`}
              >
                <div>
                  <FaFileInvoice size={25} className="dark:text-gray-300" />
                </div>
                <ListItemText
                  primary={`Invoices`}
                  className={`dark:text-white  `}
                />
              </ListItemButton>
            </ListItem>
            <Divider className="!border-[#9e9e9e29]" />
            <ListItem disablePadding>
              <ListItemButton
                className={`hover:!bg-[#9e9e9e29] !rounded-lg flex items-center gap-4 !mx-2 !my-1  ${currentPagePath === "/analytics" && "!bg-[#9e9e9e29]"}`}
              >
                <div>
                  <MdAnalytics size={25} className="dark:text-gray-300" />
                </div>
                <ListItemText
                  primary={`Analytics`}
                  className={`dark:text-white  `}
                />
              </ListItemButton>
            </ListItem>
            <Divider className="!border-[#9e9e9e29]" />
            <ListItem disablePadding>
              <ListItemButton
                className={`hover:!bg-[#9e9e9e29] !rounded-lg flex items-center gap-4 !mx-2 !my-1  ${currentPagePath === "/chat-student" && "!bg-[#9e9e9e29]"}`}
              >
                <div>
                  <PiChatTeardropDotsFill
                    size={25}
                    className="dark:text-gray-300"
                  />
                </div>
                <ListItemText
                  primary={` Chat with students`}
                  className={`dark:text-white  `}
                />
              </ListItemButton>
            </ListItem>
            <Divider className="!border-[#9e9e9e29]" />
            <ListItem disablePadding>
              <ListItemButton
                className={`hover:!bg-[#9e9e9e29] !rounded-lg flex items-center gap-4 !mx-2 !my-1  ${currentPagePath === "/live-student" && "!bg-[#9e9e9e29]"}`}
              >
                <div>
                  <IoVideocam size={25} className="dark:text-gray-300" />
                </div>
                <ListItemText
                  primary={` Live with students`}
                  className={`dark:text-white  `}
                />
              </ListItemButton>
            </ListItem>
            <Divider className="!border-[#9e9e9e29]" />

            <ListItem disablePadding>
              <Link href={`/settings`} className={`w-full`}>
                <ListItemButton
                  className={`hover:!bg-[#9e9e9e29] !rounded-lg flex items-center gap-4 !mx-2 !my-1 ${currentPagePath === "/settings" && "!bg-[#9e9e9e29]"}`}
                >
                  <div>
                    <RiSettingsFill size={25} className=" dark:text-gray-300" />
                  </div>
                  <ListItemText
                    primary={`Settings`}
                    className={`dark:text-white  `}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider className="!border-[#9e9e9e29]" />

            <ListItem disablePadding>
              <ListItemButton
                className="hover:!bg-[#9e9e9e29] !rounded-lg flex items-center gap-4 !mx-2 !my-1"
                onClick={() => logOutHandler()}
              >
                <div>
                  <PiSignOut size={25} className="dark:text-gray-300" />
                </div>
                <ListItemText
                  primary={`Sign out`}
                  className={`dark:text-white  `}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default SidebarProfessor;
