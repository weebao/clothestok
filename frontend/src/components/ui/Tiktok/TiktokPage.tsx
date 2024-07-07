import React from "react";
import { TiktokHome } from "./TiktokHome";
import { TiktokProfile } from "./TiktokProfile";

type TiktokPageType = {
  selectedPage: number;
};

export const TiktokPage: React.FC<TiktokPageType> = ({ selectedPage }) => {
  return (
    <div className="w-full h-full">
      {selectedPage === 0 && <TiktokHome />}
      {selectedPage === 3 && <TiktokProfile />}
    </div>
  );
};
