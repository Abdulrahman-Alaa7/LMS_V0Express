import React from "react";
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import {
  CODE_BLOCK_LANGUAGES_POPULAR,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
} from "@udecode/plate-code-block";
import { useEditorReadOnly } from "@udecode/plate-common";
import {
  MARK_BG_COLOR,
  MARK_COLOR,
  MARK_FONT_FAMILY,
  MARK_FONT_SIZE,
} from "@udecode/plate-font";
import { MARK_HIGHLIGHT } from "@udecode/plate-highlight";
import { ListStyleType } from "@udecode/plate-indent-list";
import { MARK_KBD } from "@udecode/plate-kbd";
import {
  ELEMENT_IMAGE,
  ELEMENT_MEDIA,
  ELEMENT_MEDIA_EMBED,
} from "@udecode/plate-media";

import { Icons, iconVariants } from "../../components/icons";
import { AlignDropdownMenu } from "../../components/plate-ui/align-dropdown-menu";
import { ColorDropdownMenu } from "../../components/plate-ui/color-dropdown-menu";
import { CommentToolbarButton } from "../../components/plate-ui/comment-toolbar-button";
import { EmojiDropdownMenu } from "../../components/plate-ui/emoji-dropdown-menu";
import { IndentListToolbarButton } from "../../components/plate-ui/indent-list-toolbar-button";
import { IndentToolbarButton } from "../../components/plate-ui/indent-toolbar-button";
import { LineHeightDropdownMenu } from "../../components/plate-ui/line-height-dropdown-menu";
import { LinkToolbarButton } from "../../components/plate-ui/link-toolbar-button";
import { MediaToolbarButton } from "../../components/plate-ui/media-toolbar-button";
import { MoreDropdownMenu } from "../../components/plate-ui/more-dropdown-menu";
import { OutdentToolbarButton } from "../../components/plate-ui/outdent-toolbar-button";
import { TableDropdownMenu } from "../../components/plate-ui/table-dropdown-menu";
import { Provider as JotaiProvider } from "jotai";

import { CodeBlockElement } from "./code-block-element";
import { FontFamilyDropdownMenu } from "./font-family-dropdown";
import { FontSizeDropdownMenu } from "./font-size-dropmenu";
import { FontWeightDropdownMenu } from "./font-weight-dropdown";
import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ModeDropdownMenu } from "./mode-dropdown-menu";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: "translateX(calc(-1px))",
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              {/* <InsertDropdownMenu /> */}
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Italic (⌘+I)" nodeType={MARK_ITALIC}>
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Underline (⌘+U)"
                nodeType={MARK_UNDERLINE}
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip="Strikethrough (⌘+⇧+M)"
                nodeType={MARK_STRIKETHROUGH}
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Code (⌘+E)" nodeType={MARK_CODE}>
                <Icons.code />
              </MarkToolbarButton>
              <FontFamilyDropdownMenu />
              <FontSizeDropdownMenu />
              <FontWeightDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton tooltip="Highlight" nodeType={MARK_HIGHLIGHT}>
                <Icons.highlight />
              </MarkToolbarButton>
              <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
                <Icons.color className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
              <ColorDropdownMenu
                nodeType={MARK_BG_COLOR}
                tooltip="Highlight Color"
              >
                <Icons.bg className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
            </ToolbarGroup>

            <ToolbarGroup>
              <AlignDropdownMenu />

              <LineHeightDropdownMenu />

              <IndentListToolbarButton nodeType={ListStyleType.Disc} />
              <IndentListToolbarButton nodeType={ListStyleType.Decimal} />
              {/* <IndentListToolbarButton nodeType={ListStyleType.Circle} />
              <IndentListToolbarButton nodeType={ListStyleType.UpperRoman} />
              <IndentListToolbarButton nodeType={ListStyleType.Armenian} /> */}

              <OutdentToolbarButton />
              <IndentToolbarButton />
            </ToolbarGroup>

            <ToolbarGroup>
              <LinkToolbarButton />

              <MediaToolbarButton tooltip="Image" nodeType={ELEMENT_IMAGE} />
              <MediaToolbarButton tooltip="Media" nodeType={ELEMENT_MEDIA} />

              <TableDropdownMenu />

              <MarkToolbarButton tooltip="Keyboard" nodeType={MARK_KBD}>
                <Icons.kbd />
              </MarkToolbarButton>

              <EmojiDropdownMenu />

              <MoreDropdownMenu />
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator>
          <CommentToolbarButton />
          <ModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  );
}
