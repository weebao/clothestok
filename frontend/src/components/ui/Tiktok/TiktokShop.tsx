import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon, TicketIcon, MapPinIcon } from "@heroicons/react/24/outline";

export const TiktokShop = () => {
  return (
    <div className="w-full h-full pt-24 px-4">
      <div className="relative mb-2">
        <MagnifyingGlassIcon className="absolute w-5 h-5 top-2 left-2 text-white" />
        <input
          type="text"
          placeholder="men t-shirt"
          className="w-full pl-8 pr-4 py-1 bg-transparent border-2 text-white border-gray-300 rounded-md focus-visible:ring-transparent"
        />
        <button className="absolute bg-white text-black rounded-md top-[5px] right-2 px-2 font-bold">
          Search
        </button>
      </div>
      <div className="flex gap-2 text-white">
        <div className="flex items-center gap-1 rounded-md bg-neutral-800 px-2 py-1">
          <BookmarkIcon className="w-5 h-5" />
          Favorites
        </div>
        <div className="flex items-center gap-1 rounded-md bg-neutral-800 px-2 py-1">
          <TicketIcon className="w-5 h-5" />
          Coupons
        </div>
        <div className="flex items-center gap-1 rounded-md bg-neutral-800 px-2 py-1">
          <MapPinIcon className="w-5 h-5" />
          Address
        </div>
      </div>
      <div className="rounded-lg bg-accent ">

      </div>
    </div>
  );
};
