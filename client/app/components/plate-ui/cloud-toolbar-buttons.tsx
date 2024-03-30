"use client";
import React, { useEffect } from "react";
import { PlateEditor, useEditorRef, Value } from "@udecode/plate-common";

import { Button } from "./button";
type Props = {
  courseContentData: any;
  setCourseContentData: (courseContentDate: any) => void;
  index: number;
};
export function CloudToolbarButtons({ setCourseContentData, index }: Props) {
  const editor = useEditorRef<Value, PlateEditor>();

  const saveValue = () => {
    const editorValue = editor.children;

    setCourseContentData((prevData: any[]) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        content: editorValue,
      };
      return updatedData;
    });
  };

  useEffect(() => {
    saveValue();
  }, [index, editor, setCourseContentData]);

  return (
    <>
      <Button
        type="button"
        onClick={saveValue}
        className="!w-full dark:!bg-[#020817] dark:!text-white dark:hover:opacity-[0.9] transition"
      >
        Save
      </Button>
    </>
  );
}
