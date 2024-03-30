"use client";
import React from "react";
import { useTheme } from "next-themes";
import { setTheme as ThemeVa } from "../calendar/utilities/helpers";
import context from "../calendar/context/appContext";
import { Button } from "../components/plate-ui/button";
import { Icons } from "../components/icons";

type Props = {};

export function ThemeToggle({}: Props) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light"),
          theme === "light"
            ? localStorage.setItem("colorScheme", `dark`)
            : localStorage.setItem("colorScheme", `light`),
          ThemeVa(context);
      }}
      className="!rounded-full mx-1 !p-2 hover:!bg-[#9e9e9e29]"
    >
      <Icons.moon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.sun className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
