import React from "react";
import type { IconType } from "./types";

export const IconTiktokPost: React.FC<IconType> = ({ className }) => {
  return (
    <svg className={className} width="45" height="29" viewBox="0 0 45 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M31.5 0H36.5C40.9183 0 44.5 3.58172 44.5 8V21C44.5 25.4183 40.9183 29 36.5 29H31.5V0Z" fill="#EE3190" />
      <path d="M13.5 0H8.5C4.08172 0 0.5 3.58172 0.5 8V21C0.5 25.4183 4.08172 29 8.5 29H13.5V0Z" fill="#00F2EA" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.5 0C8.08172 0 4.5 3.58172 4.5 8V21C4.5 25.4183 8.08172 29 12.5 29H32.5C36.9183 29 40.5 25.4183 40.5 21V8C40.5 3.58172 36.9183 0 32.5 0H12.5ZM21.5 8H24.5V13H29.5V16H24.5V21H21.5V16H16.5V13H21.5V8Z"
        fill="currentColor"
      />
    </svg>
  );
};
