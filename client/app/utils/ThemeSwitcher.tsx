"use client";
import React, { FC, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";
import { styles } from "../styles/style";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mx-1 select-none">
      {theme === "light" ? (
        <BiMoon
          className={`cursor-pointer ${styles.BgHover} `}
          fill="black"
          size={40}
          onClick={() => {
            setTheme("dark");
          }}
        />
      ) : (
        <BiSun
          className={`cursor-pointer ${styles.BgHover} `}
          fill="white"
          size={40}
          onClick={() => {
            setTheme("light");
          }}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
