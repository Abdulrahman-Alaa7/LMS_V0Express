import React from "react";
import {
  DropdownMenuProps,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { MARK_SUBSCRIPT, MARK_SUPERSCRIPT } from "@udecode/plate-basic-marks";
import { ELEMENT_CODE_BLOCK } from "@udecode/plate-code-block";
import {
  focusEditor,
  insertEmptyElement,
  toggleMark,
  useEditorRef,
} from "@udecode/plate-common";
import { ELEMENT_EXCALIDRAW } from "@udecode/plate-excalidraw";
import { ELEMENT_HR } from "@udecode/plate-horizontal-rule";
import { ELEMENT_TODO_LI } from "@udecode/plate-list";

import { Icons } from "../../components/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

const items = [
  {
    items: [
      {
        value: ELEMENT_HR,
        label: "Divider",
        description: "Divider (---)",
        icon: Icons.hr,
      },
      {
        value: ELEMENT_CODE_BLOCK,
        label: "Code",
        description: "Code (```)",
        icon: Icons.codeblock,
      },
      {
        value: ELEMENT_EXCALIDRAW,
        label: "Excalidraw",
        description: "Excalidraw",
        icon: Icons.excalidraw,
      },
      {
        value: ELEMENT_TODO_LI,
        label: "Todo",
        description: "Todo",
        icon: Icons.todo,
      },
    ],
  },
];
export function MoreDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="More">
          <Icons.more />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="flex max-h-[500px] min-w-[180px] flex-col gap-0.5 overflow-y-auto"
      >
        {items.map(({ items: nestedItems }, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <DropdownMenuSeparator />}

            {nestedItems.map(
              ({ value: type, label: itemLabel, icon: Icon }) => (
                <DropdownMenuItem
                  key={type}
                  className="min-w-[180px]"
                  onSelect={async () => {
                    switch (type) {
                      default: {
                        insertEmptyElement(editor, type, {
                          select: true,
                          nextBlock: true,
                        });
                      }
                    }

                    focusEditor(editor);
                  }}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {itemLabel}
                </DropdownMenuItem>
              )
            )}
          </React.Fragment>
        ))}

        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_SUBSCRIPT,
              clear: MARK_SUPERSCRIPT,
            });
            focusEditor(editor);
          }}
        >
          <Icons.superscript className="mr-2 h-5 w-5" />
          Superscript
          {/* (⌘+,) */}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_SUPERSCRIPT,
              clear: MARK_SUBSCRIPT,
            });
            focusEditor(editor);
          }}
        >
          <Icons.subscript className="mr-2 h-5 w-5" />
          Subscript
          {/* (⌘+.) */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
