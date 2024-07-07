import React from "react";
import type { IconType } from "./types";

export const IconTiktokMenu: React.FC<IconType> = ({ className }) => {
  return (
    <svg className={className} width="18" height="4" viewBox="0 0 18 4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2C4 3.10457 3.10458 4 2 4C0.895416 4 0 3.10457 0 2C0 0.895432 0.895416 0 2 0C3.10458 0 4 0.895432 4 2Z" fill="currentColor" />
      <path d="M11 2C11 3.10457 10.1046 4 9 4C7.89542 4 7 3.10457 7 2C7 0.895432 7.89542 0 9 0C10.1046 0 11 0.895432 11 2Z" fill="currentColor" />
      <path d="M16 4C17.1046 4 18 3.10457 18 2C18 0.895432 17.1046 0 16 0C14.8954 0 14 0.895432 14 2C14 3.10457 14.8954 4 16 4Z" fill="currentColor" />
    </svg>
  );
};
