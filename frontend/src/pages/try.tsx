import React from "react";
import { NextPage } from "next";

import { useImageContext } from "@/context/ImageContext";
import { Iphone14Frame } from "@/components/assets/Iphone14Frame";
import { Tiktok } from "@/components/ui/Tiktok";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

const TryPage: NextPage = () => {
  const { resetAll } = useImageContext();
  const { isTouchDevice } = useIsTouchDevice();
  return (
    <div className="relative w-screen h-dvh flex flex-col items-center justify-center bg-gradient-to-tr from-primary from-20% via-secondary to-accent to-80%">
      {
        isTouchDevice ? (
          <Tiktok />
        ) : (
          <>
            <Iphone14Frame>
              <Tiktok />
            </Iphone14Frame>
            <button className="absolute bottom-8 right-8 bg-neutral-200 px-2 py-1 rounded-md" onClick={resetAll}>Reset</button>
          </>
        )
      }
    </div>
  );
};

export default TryPage;
