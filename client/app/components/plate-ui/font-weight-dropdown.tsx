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

export function FontWeightDropdownMenu({ ...props }: DropdownMenuProps) {
  const openState = useOpenState();
  const editor = useEditorRef();
  const valuesFontWeight = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  const handleFontSizeChange = useCallback(
    (value: any) => {
      setMarks(editor, { fontWeight: value });
    },
    [editor, openState]
  );

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Font weight"
          isDropdown
        >
          <Icons.fontWeight />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-0">
        <DropdownMenuRadioGroup className="flex flex-col gap-0.5 max-h-[450px] overflow-auto">
          {valuesFontWeight.map((value: any) => (
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
