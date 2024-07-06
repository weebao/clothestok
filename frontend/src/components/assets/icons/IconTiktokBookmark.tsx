import React from "react";
import type { IconType } from "./types";

export const IconTiktokBookmark: React.FC<IconType> = ({ className }) => {
  return (
    <svg className={className} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_528_310)">
        <path
          d="M4 4.98512C4 3.88877 4.89543 3 6 3H24C25.1046 3 26 3.88877 26 4.98512V26.0058C26 26.7891 25.1289 27.2637 24.4631 26.8432L15.5369 21.2051C15.2093 20.9982 14.7907 20.9982 14.4631 21.2051L5.53688 26.8432C4.87115 27.2637 4 26.7891 4 26.0058V4.98512Z"
          fill="white"
        />
      </g>
      <defs>
        <filter id="filter0_d_528_310" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_528_310" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_528_310" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};
