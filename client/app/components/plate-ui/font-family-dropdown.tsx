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

export function FontFamilyDropdownMenu({ ...props }: DropdownMenuProps) {
  const openState = useOpenState();
  const editor = useEditorRef();
  const valuesFontFamily = [
    "Arial",
    "Verdana",
    "Tahoma",
    "Times New Roman",
    "Georgia",
    "Trebuchet ms",
    "Garamond",
    "Brush Script MT",
    "Courier",
    "Helvetica",
    "Gill Sans",
    "Arial Black",
    "Palatino",
    "Comic Sans MS",
    "Impact",
  ];

  const handleFontSizeChange = useCallback(
    (value: any) => {
      setMarks(editor, { fontFamily: value });
    },
    [editor, openState]
  );

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Font family"
          isDropdown
        >
          <Icons.fontFamily />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-0">
        <DropdownMenuRadioGroup className="flex flex-col gap-0.5 max-h-[450px] overflow-auto">
          {valuesFontFamily.map((value) => (
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
