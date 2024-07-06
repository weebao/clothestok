import React from "react";
import { NextPage } from "next";

import { Iphone14Frame } from "@/components/assets/Iphone14Frame";
import { Tiktok } from "@/components/ui/Tiktok";

const ARPage: NextPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-primary from-20% via-secondary to-accent to-80%">
      <Iphone14Frame>
        <Tiktok />
      </Iphone14Frame>
    </div>
  );
};

export default ARPage;
