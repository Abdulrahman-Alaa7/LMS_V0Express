import React from "react";
import { withRef } from "@udecode/cn";
import {
  ELEMENT_IMAGE,
  ELEMENT_MEDIA,
  ELEMENT_MEDIA_EMBED,
  useMediaToolbarButton,
} from "@udecode/plate-media";
import { IoVideocamOutline } from "react-icons/io5";
import { MdVideoLibrary } from "react-icons/md";

import { Icons } from "../../components/icons";

import { ToolbarButton } from "./toolbar";

export const MediaToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?:
      | typeof ELEMENT_IMAGE
      | typeof ELEMENT_MEDIA_EMBED
      | typeof ELEMENT_MEDIA;
  }
>(({ nodeType, ...rest }, ref) => {
  const { props } = useMediaToolbarButton({ nodeType });

  return (
    <ToolbarButton ref={ref} {...props} {...rest}>
      {nodeType === ELEMENT_IMAGE && <Icons.image />}
      {nodeType === ELEMENT_MEDIA_EMBED && <MdVideoLibrary size={25} />}
      {nodeType === ELEMENT_MEDIA && <MdVideoLibrary size={25} />}
    </ToolbarButton>
  );
});
