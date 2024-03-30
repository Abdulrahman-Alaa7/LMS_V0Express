import React, { useCallback } from "react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { setMarks, useEditorRef } from "@udecode/plate-common";

import { Icons } from "../../components/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function FontSizeDropdownMenu({ ...props }: DropdownMenuProps) {
  const openState = useOpenState();
  const editor = useEditorRef();
  const valuesFontSize = [
    "8px",
    "9px",
    "10px",
    "11px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "26px",
    "28px",
    "36px",
    "48px",
    "72px",
  ];

  const handleFontSizeChange = useCallback(
    (value: any) => {
      setMarks(editor, { fontSize: value });
    },
    [editor, openState]
  );

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Font size" isDropdown>
          <Icons.fontSize />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-0">
        <DropdownMenuRadioGroup className="flex flex-col gap-0.5 max-h-[450px] overflow-auto">
          {valuesFontSize.map((value) => (
            <DropdownMenuRadioItem
              key={value}
              value={value}
              className="min-w-[180px]"
              onSelect={() => handleFontSizeChange(value)}
            >
              {value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
