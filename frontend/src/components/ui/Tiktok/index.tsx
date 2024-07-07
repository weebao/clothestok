import React, { useState } from "react";
import { TiktokPage } from "./TiktokPage";
import { TiktokNavbar } from "./TiktokNavbar";

export const Tiktok: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<number>(0);


  return (
    <div className="w-full h-full flex flex-col">
      <TiktokPage selectedPage={selectedPage} />
      <TiktokNavbar selected={selectedPage} setSelected={setSelectedPage} />
    </div>
  );
};
