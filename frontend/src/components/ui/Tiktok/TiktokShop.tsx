import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon, TicketIcon, MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { DotLoader } from "react-spinners";
import { useImageContext } from "@/context/ImageContext";

export const TiktokShop = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { recommendationList } = useImageContext();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [recommendationList]);

  return (
    <div className="w-full h-full py-24 px-4 overflow-y-scroll no-scrollbar">
      <div className="relative mb-2">
        <MagnifyingGlassIcon className="absolute w-5 h-5 top-2 left-2 text-white" />
        <input
          type="text"
          placeholder="men t-shirt"
          className="w-full pl-8 pr-4 py-1 bg-transparent border-2 text-white border-gray-300 rounded-lg focus-visible:ring-transparent"
        />
        <button className="absolute bg-white text-black rounded-md top-[5px] right-[5px] px-2 font-bold">Search</button>
      </div>
      <div className="flex gap-2 text-white mb-4">
        <div className="flex items-center gap-1 rounded-md bg-neutral-800 hover:bg-neutral-600 hover:cursor-pointer px-2 py-1">
          <BookmarkIcon className="w-5 h-5" />
          Favorites
        </div>
        <div className="flex items-center gap-1 rounded-md bg-neutral-800 hover:bg-neutral-600 hover:cursor-pointer px-2 py-1">
          <TicketIcon className="w-5 h-5" />
          Coupons
        </div>
        <div className="flex items-center gap-1 rounded-md bg-neutral-800 hover:bg-neutral-600 hover:cursor-pointer px-2 py-1">
          <MapPinIcon className="w-5 h-5" />
          Address
        </div>
      </div>
      <div className="rounded-lg bg-accent text-white px-4 pt-2 pb-4 mb-4">
        <div className="w-full flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Deals best fits for you</h3>
          <ChevronRightIcon className="w-6 h-6" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {isLoading ? (
            new Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-neutral-50 aspect-square rounded-lg flex items-center justify-center">
                <DotLoader loading={isLoading} color="#FE2858" />
              </div>
            ))
          ) : recommendationList.length === 0 ? <p className="col-span-2 text-center">No results yet. You might want to update your ClothesTok profile</p> : (
            recommendationList.map((item, index) => (
              <div key={index} className="bg-neutral-50 aspect-square rounded-lg">
                <iframe src={item} />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="rounded-lg bg-neutral-700 text-white px-4 pt-2 pb-4 mb-8">
        <div className="w-full flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Today's Deals</h3>
          <ChevronRightIcon className="w-6 h-6" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-neutral-50 aspect-square rounded-lg"></div>
          <div className="bg-neutral-50 aspect-square rounded-lg"></div>
          <div className="bg-neutral-50 aspect-square rounded-lg"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-neutral-50 aspect-square rounded-lg col-span-2 row-span-2"></div>
        <div className="bg-neutral-50 aspect-square rounded-lg"></div>
        <div className="bg-neutral-50 aspect-square rounded-lg"></div>
      </div>
    </div>
  );
};
