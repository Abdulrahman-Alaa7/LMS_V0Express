"use client";
// import type { Metadata } from "next";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import context, { datepickerContext } from "./context/appContext";
import store from "./context/store";
import setAppDefaults from "./config/appDefaults";
import renderViews from "./config/renderViews";
// Import CSS files
import "./styles/header.css";
import "./styles/root.css";
import "./styles/containers.css";
import "./styles/yearview.css";
import "./styles/monthview.css";
import "./styles/weekview.css";
import "./styles/dayview.css";
import "./styles/listview.css";
import "./styles/sidebar.css";
import "./styles/sbdatepicker.css";
import "./styles/aside/datepicker.css";
import "./styles/aside/toast.css";
import "./styles/aside/goto.css";
import "./styles/aside/toggleForm.css";
import "./styles/aside/sidebarSubMenu.css";
import "./styles/aside/changeViewModule.css";
import "./styles/aside/editCategoryForm.css";
import "./styles/aside/form.css";
import "./styles/aside/timepicker.css";
import "./styles/aside/deleteCategoryPopup.css";
import "./styles/aside/entryOptions.css";
import "./styles/aside/info.css";
import "./styles/aside/shortcuts.css";
import { useSelector } from "react-redux";
import StudentProtected from "../hooks/studentProtected";
import Loader from "../components/Loader/Loader";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user.role === "student") {
      // Run the setAppDefaults function
      setAppDefaults(context, store);

      // Run the renderViews function
      renderViews(context, datepickerContext, store);
    }
  }, [user?.role]);

  return <>{children}</>;
}
