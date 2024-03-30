"use client";
import React, { FC, useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";

type Props = {
  isDashboard?: boolean;
};

const DashboardHero: FC<Props> = ({ isDashboard }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
    </div>
  );
};

export default DashboardHero;
