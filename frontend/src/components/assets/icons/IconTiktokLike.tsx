import React, { useState } from "react";
import type { IconType } from "./types";

export const IconTiktokLike: React.FC<IconType> = ({ className }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <svg className={`${className} ${clicked ? 'text-accent' : ''}`} onClick={() => setClicked(!clicked)} width="31" height="30" viewBox="0 0 31 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_528_302)">
        <path
          d="M29 9.99184C29 18.4448 20.55 24.9693 16.7796 27.4599C15.6881 28.1808 14.3123 28.1799 13.2215 27.4579C9.45167 24.9625 1 18.4274 1 9.99184C1 8.31449 1.51362 6.67966 2.46812 5.31893C3.42261 3.95819 4.76958 2.94054 6.31823 2.41012C7.86688 1.87969 9.53869 1.86339 11.0969 2.36352C12.655 2.86365 14.0205 3.85486 15 5.19674C15.9795 3.85486 17.345 2.86365 18.9031 2.36352C20.4613 1.86339 22.1331 1.87969 23.6818 2.41012C25.2304 2.94054 26.5774 3.95819 27.5319 5.31893C28.4864 6.67966 29 8.31449 29 9.99184Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <filter id="filter0_d_528_302" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_528_302" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_528_302" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};
