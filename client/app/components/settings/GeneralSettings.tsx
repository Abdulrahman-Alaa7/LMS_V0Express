"use client";
import React, { FC, useState } from "react";
import { MdClose, MdLanguage } from "react-icons/md";
import { Button } from "../plate-ui/button";
import { styles } from "../../styles/style";
import { ThemeToggle } from "@/app/utils/theme-toggle";
import { FormControlLabel, Switch, styled } from "@mui/material";

type Props = {};

const GeneralSettings: FC<Props> = ({}) => {
  const [isPopupLangOpen, setIsPopupLangOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

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

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 4,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 18,
        height: 18,
      },
      "&::before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 10,
      },
      "&::after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 10,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 18,
      height: 18,
      margin: 1,
    },
  }));

  return (
    <div className={`w-[90%] 800px:w-[70%] mx-auto mb-3 mt-12`}>
      <div
        className={`flex justify-between items-center bg-[#9e9e9e29] p-4 rounded-full mb-3`}
      >
        <h3 className="font-semibold mx-2">Language</h3>
        <div>
          <button
            type="button"
            className="!rounded-full p-2 hover:bg-[#9e9e9e29] transition mx-2"
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
      </div>
      <div
        className={`flex justify-between items-center bg-[#9e9e9e29] p-4 rounded-full mb-3`}
      >
        <h3 className="font-semibold mx-2">Theme</h3>
        <div className="rounded-full mx-2">
          <ThemeToggle />
        </div>
      </div>
      <div
        className={`flex justify-between items-center bg-[#9e9e9e29] p-4 rounded-full mb-3`}
      >
        <h3 className="font-semibold mx-2">Notification</h3>
        <div className="rounded-full mx-2">
          <FormControlLabel
            control={<Android12Switch />}
            label=""
            className="!mr-0"
          />
        </div>
      </div>
      <div
        className={`flex justify-between items-center bg-[#9e9e9e29] p-4 rounded-full mb-3`}
      >
        <h3 className="font-semibold mx-2">Clear cashe</h3>
        <button
          type="button"
          className=" p-2 rounded-lg bg-[#9e9e9e29] text-[#0095f6] px-8 transition hover:opacity-80 mx-2"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;
