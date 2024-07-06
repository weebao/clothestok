import React from "react";
import { TiktokScreen } from "./TiktokScreen";
import { TiktokNavbar } from "./TiktokNavbar";

export const Tiktok: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <TiktokScreen />
      <TiktokNavbar selected={0} />
    </div>
  );
};
