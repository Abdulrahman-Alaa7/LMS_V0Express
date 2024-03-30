import React from "react";
import { cn, withRef } from "@udecode/cn";
import { PlateElement } from "@udecode/plate-common";
import { Provider as JotaiProvider } from "jotai";

export const TableRowElement = withRef<
  typeof PlateElement,
  {
    hideBorder?: boolean;
  }
>(({ hideBorder, children, ...props }, ref) => {
  return (
    <PlateElement
      asChild
      ref={ref}
      className={cn("h-full", hideBorder && "border-none")}
      {...props}
    >
      <tr>{children}</tr>
    </PlateElement>
  );
});
