"use client";
import React, { useState, useEffect } from "react";
import Header from "./CalendarComponents/Header";
import OverLays from "./CalendarComponents/OverLays";
import MainCalendar from "./CalendarComponents/MainCalendar";
import MainCalendarForm from "./CalendarComponents/MainCalendarForm";
import ChangeView from "./CalendarComponents/ChangeView";
import ToggleForm from "./CalendarComponents/ToggleForm";
import CategoryForm from "./CalendarComponents/CategoryForm";
import CollapseView from "./CalendarComponents/CollapseView";
import GoToDate from "./CalendarComponents/GoToDate";
import EntryOptions from "./CalendarComponents/EntryOptions";
import SidebarInfoPopup from "./CalendarComponents/SidebarInfoPopup";
import ShortcutsModal from "./CalendarComponents/ShortcutsModal";
import SidebarSubMenu from "./CalendarComponents/SidebarSubMenu";
import DatePickerIndex from "./CalendarComponents/DatePicker/DatePickerIndex";

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

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <div className="all-view-calendar">
        <Header />
        <MainCalendar />

        <OverLays />

        <DatePickerIndex />

        <MainCalendarForm />

        <ChangeView />

        <ToggleForm />

        <CategoryForm />

        <CollapseView />

        <GoToDate />

        <SidebarSubMenu />

        <EntryOptions />

        <SidebarInfoPopup />

        <ShortcutsModal />

        <aside className="toast"></aside>
      </div>
    </>
  );
};

export default Page;
