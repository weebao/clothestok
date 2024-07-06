import React from "react";

export const TiktokScreen: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-black from-20% to-transparent z-10"></div>
      <video
        autoPlay
        loop
        muted
        className='absolute w-full bottom-0'
      >
        <source src='/tiktokvid.mp4' type='video/mp4' />
        Your browser does not support this video
      </video>
    </div>
  )
}