import React from "react";
import type { IconType } from "./types";

export const IconTiktokShare: React.FC<IconType> = ({ className }) => {
  return (
    <svg className={className} width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_528_314)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.6193 2.2949C15.9893 1.66493 14.9122 2.1111 14.9122 3.002V8.58779C9.09571 9.49329 2.82742 12.0869 2.00334 23.0559C1.93541 23.9601 2.9196 24.3127 3.5701 23.6811C5.21358 22.0852 8.25036 20.2449 14.9122 20.2449V26.1736C14.9122 27.0645 15.9893 27.5107 16.6193 26.8807L27.498 16.002C28.279 15.221 28.279 13.9546 27.498 13.1736L16.6193 2.2949Z"
          fill="white"
        />
      </g>
      <defs>
        <filter id="filter0_d_528_314" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_528_314" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_528_314" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};
