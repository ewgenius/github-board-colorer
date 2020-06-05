import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const Portal = ({
  element,
  children,
}: PropsWithChildren<{ element: Element }>) => {
  return createPortal(children, element);
};
