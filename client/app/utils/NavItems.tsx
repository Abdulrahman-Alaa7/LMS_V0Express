import Link from "next/link";
import React, { FC } from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItmes: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((item, index) => {
            return (
              <Link href={item.url} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? " text-[#0095f6]"
                      : "dark:text-white text-black"
                  } text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6 border-b">
            <Link href={`/`} passHref>
              <span
                className={`text-[25px] font-Poppins font-[500] text-white`}
              >
                LMS
              </span>
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((item, index) => {
              return (
                <Link href={item.url} key={index} passHref>
                  <span
                    className={`${
                      activeItem === index
                        ? "text-[#0095f6]"
                        : "dark:text-white text-white"
                    } text-[18px] px-6 font-Poppins font-[400] block py-4`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
        </div>
      )}
    </>
  );
};

export default NavItmes;
