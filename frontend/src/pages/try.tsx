import React from "react";
import { NextPage } from "next";

import { useImageContext } from "@/context/ImageContext";
import { Iphone14Frame } from "@/components/assets/Iphone14Frame";
import { Tiktok } from "@/components/ui/Tiktok";

const TryPage: NextPage = () => {
  const { resetAll } = useImageContext();
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-primary from-20% via-secondary to-accent to-80%">
      <Iphone14Frame>
        <Tiktok />
      </Iphone14Frame>
      <button className="absolute bottom-8 right-8 bg-neutral-200 px-2 py-1 rounded-md" onClick={resetAll}>Reset</button>
    </div>
  );
};

export default TryPage;
