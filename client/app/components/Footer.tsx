"use client";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";

type Props = {};

const Footer: FC<Props> = (props) => {
  return (
    <footer>
      <div className={`border border-[#0000000e] dark:border-[#ffffff1e]`} />
      <br />
      <div
        className={`w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8`}
      >
        <div className={`grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4`}>
          <div className={`space-y-3`}>
            <h3 className={`text-[20px] font-[600] text-black dark:text-white`}>
              About
            </h3>
            <ul className={`space-y-4`}>
              <li>
                <Link
                  href={`/about`}
                  className={`text-base text-black dark:text-gray-300 dark:hover:text-white`}
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href={`/privacy-policy`}
                  className={`text-base text-black dark:text-gray-300 dark:hover:text-white`}
                >
                  Privacy-Policy
                </Link>
              </li>
              <li>
                <Link
                  href={`/faq`}
                  className={`text-base text-black dark:text-gray-300 dark:hover:text-white`}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className={`space-y-3`}>
            <h3 className={`text-[20px] font-[600] text-black dark:text-white`}>
              Quick Links
            </h3>
            <ul className={`space-y-4`}>
              <li>
                <Link
                  href={`/courses`}
                  className={`text-base text-black dark:text-gray-300 dark:hover:text-white`}
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href={`/profile`}
                  className={`text-base text-black dark:text-gray-300 dark:hover:text-white`}
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href={`/course-dashboard`}
                  className={`text-base text-black dark:text-gray-300 dark:hover:text-white`}
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className={`space-y-3`}>
            <h3 className={`text-[20px] font-[600] text-black dark:text-white`}>
              Social Links
            </h3>
            <ul className={`space-y-4`}>
              <li>
                <Link
                  href={`https://youtube.com`}
                  className={`text-base text-black dark:text-gray-300 dark:hover:text-white`}
                >
                  Youtube
                </Link>
              </li>
              <li>
                <Link
                  href={`https://instagram.com`}
                  className={`text-base text-black dark:text-gray-300 dark:hover:text-white`}
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href={`https://github.com/Abdulrahman-Alaa7`}
                  className={`text-base text-black dark:text-gray-300 dark:hover:text-white`}
                >
                  Github
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`text-[20px] text-black dark:text-white pb-3 font-[600]`}
            >
              Conatct Info
            </h3>
            <p
              className={`text-base text-black dark:text-gray-300 dark:hover:text-white pb-2`}
            >
              Call Us: 1-995-775-2024
            </p>

            <p
              className={`text-base text-black dark:text-gray-300 dark:hover:text-white pb-2`}
            >
              Address: Egypt, Giza, Inside The Sphinx
            </p>

            <p
              className={`text-base text-black dark:text-gray-300 dark:hover:text-white pb-2`}
            >
              Mail Us: hello@LMS.com
            </p>
          </div>
        </div>
        <br />
        <p className={`text-center text-black dark:text-white`}>
          Copyright &copy; {new Date().getFullYear()} ELearning | All Rights
          Reserved
        </p>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
