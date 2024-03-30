"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@udecode/cn";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { commentsUsers, myUserId } from "../lib/plate/comments";
import { MENTIONABLES } from "../lib/plate/mentionables";
import { plugins } from "../lib/plate/plate-plugins";
import { CommentsPopover } from "../components/plate-ui/comments-popover";
import { CursorOverlay } from "../components/plate-ui/cursor-overlay";
import { Editor } from "../components/plate-ui/editor";
import { FixedToolbar } from "../components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "../components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "../components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "../components/plate-ui/floating-toolbar-buttons";
import { MentionCombobox } from "../components/plate-ui/mention-combobox";
import { CloudToolbarButtons } from "./plate-ui/cloud-toolbar-buttons";

type Props = {
  courseContentData: any;
  setCourseContentData: (courseContentDate: any) => void;
  index: number;
  value: any;
};

export default function MyEditor({
  courseContentData,
  setCourseContentData,
  index,
  value,
}: Props) {
  const containerRef = useRef(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative">
        <CommentsProvider users={commentsUsers} myUserId={myUserId}>
          <Plate plugins={plugins} initialValue={value}>
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              className="px-[35px] py-8 !min-h-[350px] !max-h-[600px] overflow-auto mt-1 !outline-gray-600 "
              autoFocus
              focusRing={true}
              variant="ghost"
              size="md"
            />
            <div className="flex items-center gap-1 my-3 justify-center px-3">
              <CloudToolbarButtons
                courseContentData={courseContentData}
                setCourseContentData={setCourseContentData}
                index={index}
              />
            </div>
            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>

            <MentionCombobox items={MENTIONABLES} />

            <CommentsPopover />
          </Plate>
        </CommentsProvider>
      </div>
    </DndProvider>
  );
}
