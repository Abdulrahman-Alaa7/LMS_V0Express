"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import SettingsHeader from "../components/settings/SettingsHeader";
import GeneralSettings from "../components/settings/GeneralSettings";
import PrivateSettings from "../components/settings/PrivateSettings";

type Props = {};

const Page: FC<Props> = ({}) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`Settings | ELearning`}
          description="LMS is a platform for students to learn and get help from teachers"
          keywords="Programming, Science, Languages,etc"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={5}
          setRoute={setRoute}
          route={route}
        />
        <div>
          <SettingsHeader active={active} setActive={setActive} />
        </div>
        {active === 0 && (
          <div className={`min-h-[70.2vh]`}>
            <GeneralSettings />
          </div>
        )}
        {active === 1 && (
          <div className={`min-h-[70.2vh]`}>
            <PrivateSettings />
          </div>
        )}
      </Protected>
    </div>
  );
};

export default Page;
