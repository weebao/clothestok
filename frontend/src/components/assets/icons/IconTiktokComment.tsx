import React from "react";
import type { IconType } from "./types";

export const IconTiktokComment: React.FC<IconType> = ({ className }) => {
  return (
    <svg className={className} width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_528_306)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29 13.5C29 13.9265 28.9727 14.3476 28.9196 14.7621C28.515 19.0905 24.71 24.8553 16.6569 27.7717C16.336 27.8879 16 27.6476 16 27.3063V24.9922C15.8341 24.9974 15.6674 25 15.5 25C8.04416 25 2 19.8513 2 13.5C2 7.14874 8.04416 2 15.5 2C22.9558 2 29 7.14874 29 13.5ZM10 16C11.1046 16 12 15.1046 12 14C12 12.8954 11.1046 12 10 12C8.89542 12 8 12.8954 8 14C8 15.1046 8.89542 16 10 16ZM16 16C17.1046 16 18 15.1046 18 14C18 12.8954 17.1046 12 16 12C14.8954 12 14 12.8954 14 14C14 15.1046 14.8954 16 16 16ZM24 14C24 15.1046 23.1046 16 22 16C20.8954 16 20 15.1046 20 14C20 12.8954 20.8954 12 22 12C23.1046 12 24 12.8954 24 14Z"
          fill="white"
        />
      </g>
      <defs>
        <filter id="filter0_d_528_306" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_528_306" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_528_306" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};
