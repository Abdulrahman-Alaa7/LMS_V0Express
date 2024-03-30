"use client";
import React, { FC, useState, useEffect } from "react";
import CustomModal from "../utils/CustomModal";
import Image from "next/image";
import avatar from "../../public/assets/avatar.png";
import { useLogoutQuery } from "../../redux/features/auth/authApi";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import Link from "next/link";
import Login from "./Login";
import { MdClose } from "react-icons/md";
import { styles } from "../styles/style";
import { MdLanguage } from "react-icons/md";
import UserAuth from "../hooks/userAuth";
import LoaderUser from "./Loader/LoaderUser";
import { ThemeToggle } from "../utils/theme-toggle";
import SidebarProfileStudent from "./Sidebars/SidebarProfileStudent";
import SidebarManger from "./Sidebars/SidebarManger";
import SidebarUniversity from "./Sidebars/SidebarUniversity";
import { IoMdNotifications } from "react-icons/io";
import NotificationMenu from "./NotificationMenu";
import Badge from "@mui/material/Badge";
import SidebarFaculty from "./Sidebars/SidebarFaculty";
import SidebarDepartment from "./Sidebars/SidebarDepartment";
import SidebarProfessor from "./Sidebars/SidebarProfessor";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  route: string;
  setRoute: (route: string) => void;
  activeItem: number;
};

const Header: FC<Props> = ({ open, setOpen, route, setRoute, activeItem }) => {
  const [openNotification, setOpenNotification] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isPopupLangOpen, setIsPopupLangOpen] = useState(false);

  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});

  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const user = userData?.user;
  const Iuser = UserAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      setLogout(true);
    }
  }, [user, isLoading]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  function openPopupLang() {
    setIsPopupLangOpen(true);
  }

  function closePopupLang() {
    setIsPopupLangOpen(false);
  }

  function handleLanguageSelect(language: any) {
    setSelectedLanguage(language);
    closePopupLang();
  }

  return (
    <div className={`w-full relative z-50`}>
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 bg-white dark:to-black fixed top-0 left-0 w-full h-[70px] z-[80px] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[70px] z-[80px] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto  h-full">
          <div className="w-full h-[80px] flex items-center justify-between px-2">
            <div>
              <Link
                href={`/`}
                className={`text-[25px] font-Poppins font-[500] ${styles.textGradient}`}
              >
                ELearning
              </Link>
            </div>
            <div className="flex items-center gap-1 800px:gap-2">
              <ThemeToggle />
              {!Iuser && (
                <div>
                  <button
                    type="button"
                    className="!rounded-full p-2 hover:bg-[#9e9e9e29] transition"
                    onClick={openPopupLang}
                  >
                    <MdLanguage size={25} />
                  </button>
                  {isPopupLangOpen && (
                    <div className="popup-overlay">
                      <div className="popup flex flex-col p-3 dark:bg-[#0f1419]">
                        <br />
                        <h4 className="font-bold font-Poppins text-lg py-3 text-center border-b border-b-[#00000029] dark:border-b-[#9e9e9e29] dark:text-white text-black">
                          Choose a language
                        </h4>
                        <br />
                        <button
                          className={`py-2 dark:text-white text-black transition hover:bg-[#9e9e9e29] ${
                            selectedLanguage === "Englsih" && "!text-[#0095f6]"
                          }`}
                          onClick={() => handleLanguageSelect("Englsih")}
                        >
                          English
                        </button>
                        <button
                          className={`py-2 dark:text-white text-black transition hover:bg-[#9e9e9e29] ${
                            selectedLanguage === "العربية" && "!text-[#0095f6]"
                          }`}
                          onClick={() => handleLanguageSelect("العربية")}
                        >
                          العربيه
                        </button>
                        <button
                          className={`absolute right-1 top-1 p-2 ${styles.BgHover}`}
                          onClick={closePopupLang}
                        >
                          <MdClose
                            size={25}
                            className={` dark:text-white text-black `}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {Iuser && (
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenNotification(!openNotification)}
                  >
                    <Badge badgeContent={4} color="error">
                      <IoMdNotifications
                        size={40}
                        className="transition hover:bg-[#9e9e9e29] p-2 rounded-full mt-1"
                      />
                    </Badge>
                    {openNotification && (
                      <>
                        <NotificationMenu openNotification={openNotification} />
                      </>
                    )}
                  </button>
                </div>
              )}

              {isLoading ? (
                <LoaderUser />
              ) : (
                <>
                  {Iuser ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenSidebar(!openSidebar)}
                      >
                        <Image
                          src={
                            userData?.user?.avatar || avatar
                              ? userData?.user?.avatar?.url || avatar
                              : avatar
                          }
                          alt=""
                          className={`w-[30px] h-[30px] rounded-full cursor-pointer mx-2`}
                          width={30}
                          height={30}
                          style={{
                            border: activeItem === 5 ? "2px solid #0095f6" : "",
                          }}
                        />
                      </button>
                    </>
                  ) : (
                    <button
                      className={` 800px:block cursor-pointer font-semibold text-white bg-[#0095f6]  px-8 py-1 text-[18px] rounded transition hover:opacity-[0.9]`}
                      onClick={() => setOpen(true)}
                    >
                      Login
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {openSidebar && (
          <>
            {user?.role === "manger" && (
              <SidebarManger
                user={user}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
            )}
            {user?.role === "university" && (
              <SidebarUniversity
                user={user}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
            )}
            {user?.role === "faculty" && (
              <SidebarFaculty
                user={user}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
            )}
            {user?.role === "department" && (
              <SidebarDepartment
                user={user}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
            )}
            {user?.role === "professor" && (
              <SidebarProfessor
                user={user}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
            )}
            {user?.role === "student" && (
              <SidebarProfileStudent
                user={user}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
            )}
          </>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
