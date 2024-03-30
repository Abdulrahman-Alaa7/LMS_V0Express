"use client";
import { styles } from "@/app/styles/style";
import React, { FC, useState, useEffect } from "react";
import { TiDocumentDelete } from "react-icons/ti";
import { FaFileCirclePlus } from "react-icons/fa6";
import { FaFileCircleCheck } from "react-icons/fa6";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

type Props = {
  active: number;
  setActive: (active: number) => void;
  coursePdfInfo: any;
  setCoursePdfInfo: (coursePdf: any) => void;
  handleSubmit: any;
};

const CoursePdf: FC<Props> = ({
  active,
  setActive,
  coursePdfInfo,
  setCoursePdfInfo,
  handleSubmit,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setCoursePdfInfo({
            coursePdf: reader.result,
            pdfName: file.name,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePdf = () => {
    setCoursePdfInfo({ coursePdf: "", pdfName: "" });
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCoursePdfInfo({
            coursePdf: reader.result,
            pdfName: file.name,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    handleSubmit();
    setActive(active + 1);
  };

  return (
    <div className={`w-[80%] m-auto mt-24`}>
      <form onSubmit={handleSubmit}>
        <br />
        <div className={`w-full`}>
          {coursePdfInfo?.coursePdf === "" ||
          coursePdfInfo?.coursePdf === undefined ? (
            <div>
              <input
                type="file"
                name=""
                id="file"
                accept=".pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx"
                className={`hidden`}
                onChange={handleFileChange}
              />
              <label
                htmlFor="file"
                className={`cursor-pointer`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="p-8 border  border-gray-300 dark:border-gray-600 rounded-lg flex flex-col justify-center items-center gap-3">
                  <FaFileCirclePlus
                    size={120}
                    className={`text-gray-500 mb-3`}
                  />
                  <span className={` block font-semibold text-gray-500`}>
                    Drag and drop your thumbnail here or click to browse
                    (Optional)
                  </span>
                </div>
              </label>
            </div>
          ) : (
            <div className=" flex flex-col items-center justify-center border border-blue-500 p-4 rounded-lg">
              <div className=" ml-16" onClick={handleDeletePdf}>
                <TiDocumentDelete
                  size={40}
                  className={`text-[crimson] cursor-pointer ${styles.BgHover} `}
                />
              </div>
              <a
                href={coursePdfInfo.coursePdf?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFileCircleCheck
                  size={120}
                  className={`mb-6 text-[#0095f6]`}
                />
              </a>
              <p className={`bg-[#9e9e9e29] p-2  font-semibold rounded-md`}>
                {coursePdfInfo?.pdfName}
              </p>
            </div>
          )}
        </div>
        <br />
        <div className={`w-full flex items-center justify-between`}>
          <button
            type="button"
            className="flex justify-center items-center  w-[80px] h-[40px]  bg-[#0095f6] text-center text-white rounded-full mt-8 cursor-pointer transition hover:opacity-[0.8]"
            onClick={() => prevButton()}
          >
            <GoChevronLeft size={35} />
          </button>
          <div
            className="flex justify-center items-center  w-[80px] h-[40px]  bg-[#0095f6] text-center text-white rounded-full mt-8 cursor-pointer transition hover:opacity-[0.8]"
            onClick={() => handleOptions()}
          >
            <GoChevronRight size={35} />
          </div>
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CoursePdf;
