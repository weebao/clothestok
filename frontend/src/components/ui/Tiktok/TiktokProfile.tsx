import React, { useState, useRef, useCallback } from "react";
import { IconTiktokAddAccount, IconTiktokHeartHide, IconTiktokTabs, IconTiktokMenu, IconClothesTok } from "@/components/assets/icons";
import Webcam from "react-webcam";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useImageContext } from "@/context/ImageContext";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

export const TiktokProfile: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openCamera, setOpenCampera] = useState<boolean>(false);
  const webcamRef = useRef<any>(null);
  const { imageUrl, displayImageUrl, setImageUrl, fetchRecommendation } = useImageContext();
  const { isTouchDevice } = useIsTouchDevice();

  const closeDialog = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpenDialog(false);
    }
  };

  console.log(displayImageUrl)

  const takePic = useCallback(() => {
    const url = webcamRef.current.getScreenshot();
    setImageUrl(url);
    setOpenCampera(false);
    setOpenDialog(true);
  }, [webcamRef]);

  return (
    <div className="relative w-full h-full bg-neutral-100">
      <div className={`px-6 ${isTouchDevice ? 'pt-8' : 'pt-14'} pb-2 flex items-center justify-between`}>
        <IconTiktokAddAccount />
        <div className="flex items-center gap-2">
          <div className="font-bold">Name</div>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
        <IconTiktokMenu />
      </div>
      <div className="w-full h-[1px] bg-neutral-300"></div>
      <div className="w-full h-full bg-neutral-100 flex flex-col items-center">
        <div className="rounded-full w-24 h-24 mt-12 bg-neutral-600 mb-2"></div>
        <div className="font-bold mb-2">@username</div>
        <div className="w-4/6 flex mb-4">
          <div className="w-1/3 justify-self-end text-center">
            <div className="text-lg font-extrabold">0</div>
            <div className="text-sm text-neutral-500">Following</div>
          </div>
          <div className="w-1/3 text-center">
            <div className="text-lg font-extrabold">0</div>
            <div className="text-sm text-neutral-500">Followers</div>
          </div>
          <div className="w-1/3 text-center">
            <div className="text-lg font-extrabold">0</div>
            <div className="text-sm text-neutral-500">Likes</div>
          </div>
        </div>
        <div className="flex items-stretch gap-1">
          <div className="flex items-center px-4 py-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 transition-all duration-150 hover:cursor-pointer font-bold">
            Edit Profile
          </div>
          <div
            className="flex items-center p-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 transition-all duration-150 hover:cursor-pointer"
            onClick={() => setOpenDialog(true)}
          >
            <IconClothesTok className="w-7 h-6" />
          </div>
          <div className="flex items-center p-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 transition-all duration-150 hover:cursor-pointer">
            <BookmarkIcon className=" w-6 h-6" />
          </div>
        </div>
        <div className="mt-12 w-full flex text-neutral-400">
          <IconTiktokTabs className="flex-1 w-6 h-6" />
          <IconTiktokHeartHide className="flex-1 w-6 h-6" />
        </div>
      </div>
      {openDialog ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={(e) => closeDialog(e)}>
          <div className="relative w-[80%] bg-white p-6 rounded-lg">
            <button className="absolute top-2 right-2" onClick={() => setOpenDialog(false)}>
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold mb-2 text-center">ClothesTok</h2>
              {displayImageUrl && displayImageUrl !== "" ? (
                <>
                  <img src={displayImageUrl} alt="captured" className="w-64 h-64 object-cover rounded-lg mb-4" />
                  <div className="flex gap-2 font-semibold">
                    <button
                      className="px-4 py-2 bg-accent text-white rounded-lg"
                      onClick={() => {
                        setOpenDialog(false);
                        setOpenCampera(true);
                      }}
                    >
                      Retake
                    </button>
                    <button
                      className="px-4 py-2 bg-primary text-neutral-950 rounded-lg"
                      onClick={() => {
                        setOpenDialog(false);
                        fetchRecommendation();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </>
                ) : (
                <>
                  <p className="text-center mb-4">Show us how you look like and we will bring the best clothes to you!</p>
                  <button
                    className="px-4 py-2 bg-accent text-white rounded-lg"
                    onClick={() => {
                      setOpenDialog(false);
                      setOpenCampera(true);
                    }}
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {openCamera ? (
        <div className="absolute w-full h-full top-0 bg-neutral-950 flex flex-col">
          <Webcam ref={webcamRef} className="w-full h-full" />
          <div className="bg-neutral-900 text-white flex items-center justify-between px-4 py-6">
            <div className="flex-1 hover:cursor-pointer" onClick={() => setOpenCampera(false)}>Cancel</div>
            <div className="flex-1 flex items-center justify-center relative hover:cursor-pointer" onClick={takePic}>
              <div className="absolute rounded-full bg-neutral-900 border-2 border-white w-10 h-10"></div>
              <div className="rounded-full bg-white w-8 h-8 z-10"></div>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
