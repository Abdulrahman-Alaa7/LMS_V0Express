"use client";
import React from "react";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { commentsUsers, myUserId } from "../lib/plate/comments";
import { plugins } from "../lib/plate/plate-plugins";
import { Editor } from "../components/plate-ui/editor";

type Props = {
  value: any;
};

export default function StudentEditor({ value }: Props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={commentsUsers} myUserId={myUserId}>
        <Plate plugins={plugins} value={value}>
          <Editor
            className="px-[35px] py-8 overflow-auto mt-1 "
            autoFocus
            focusRing={true}
            variant="ghost"
            readOnly
          />
        </Plate>
      </CommentsProvider>
    </DndProvider>
  );
}
