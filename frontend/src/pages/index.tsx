import React from "react";
import Image from "next/image";
import Link from "next/link"
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-8">
        <Image src="/clothestok.svg" alt="ClothesTok Logo" width={128} height={128} />
        <div>
          <h1 className="font-header text-6xl font-bold mb-2">ClothesTok</h1>
          <p className="text-xl">Personalize how you shop on TikTok with AR</p>
        </div>
      </div>
      <Link href="/ar">
        <button className="px-8 py-2 bg-accent rounded-md font-semibold hover:bg-accent-hover transition-all duration-150 active:scale-95">
          Try Now
        </button>
      </Link>
    </div>
  )
};

export default Home;
