import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconTiktokLike, IconTiktokComment, IconTiktokBookmark, IconTiktokShare, IconClothesTok } from "@/components/assets/icons";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ClipLoader, DotLoader } from "react-spinners";

import { TiktokShop } from "./TiktokShop";
import { useImageContext } from "@/context/ImageContext";

export const TiktokHome: React.FC = () => {
  const [vids, setVids] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<number>(2);
  const [dragging, setDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollStartY, setScrollStartY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [addToCart, setAddToCart] = useState<boolean>(false);
  const [openTryon, setOpenTryon] = useState<boolean>(false);
  const [isTryonBtnLoading, setIsTryonBtnLoading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const { recommendationList, tryOnImageUrl, isFetching } = useImageContext();

  const tabUnderline = (selectedTab: number) => {
    switch (selectedTab) {
      case 0:
        return "w-4 left-0";
      case 1:
        return "w-[25px] left-[110px]";
      case 2:
        return "w-[33px] left-[185px]";
      default:
        return "w-4 left-1/2";
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartY(e.clientY);
    setScrollStartY(scrollContainerRef.current ? scrollContainerRef.current.scrollTop : 0);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const currentY = e.clientY;
    const diffY = startY - currentY;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, scrollStartY + diffY);
    }
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  const openTryonDialog = () => {
    if (!isFetching && tryOnImageUrl) {
      setOpenTryon(true);
    } else {
      setIsTryonBtnLoading(true);
    }
  }

  const closeTryonDialog = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpenTryon(false);
    }
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    setVids([
      {
        path: "tiktokvid0.mp4",
        avatar:
          "https://p19-pu-sign-useast8.tiktokcdn-us.com/tos-useast5-avt-0068-tx/50a509743e4cda0f04f761f00c76ed1a~c5_100x100.jpeg?lk3s=a5d48078&nonce=23812&refresh_token=7950fc15b73fca16f959e235f51d5b5c&x-expires=1720508400&x-signature=ufvwoU4KKV5nmDs78m1PoNECOpw%3D&shp=a5d48078&shcp=81f88b70",
        likes: "500.3K",
        comments: "1983",
        bookmarks: "20.7K",
        shares: "6604",
        creator: "laufey",
        title: "living my best life",
      },
      {
        path: "tiktokvid1.MP4",
        avatar:
          "https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-euttp/05e04faaba5ed2b76bc188da19959bba~c5_100x100.jpeg?lk3s=a5d48078&nonce=70270&refresh_token=78915347977d646743205cf7d28bc1f5&x-expires=1720508400&x-signature=SM%2B3yZk2Kb4ICy6uEx%2Fx3zF%2BCFY%3D&shp=a5d48078&shcp=81f88b70",
        likes: "2647",
        comments: "11",
        bookmarks: "578",
        shares: "121",
        creator: "imbrian_store",
        title: "old italian style",
      },
    ]);
  }, []);

  useEffect(() => {
    scrollContainerRef.current?.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (addToCart) {
      setTimeout(() => {
        setAddToCart(false);
      }, 2000);
    }
  }, [addToCart]);

  useEffect(() => {
    if (tryOnImageUrl) {
      setIsTryonBtnLoading(false);
    }
  }, [tryOnImageUrl]);

  return (
    <div className="relative w-full h-full">
      <div id="tabs" className="absolute top-14 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center text-white font-semibold relative">
          <div className={`px-4 py-1 transition-all duration-150 ${selectedTab !== 0 ? "opacity-60" : ""} select-none`}>Explore</div>
          <div
            className={`px-4 py-1 transition-all duration-150 ${selectedTab !== 1 ? "opacity-60" : ""} select-none hover:cursor-pointer`}
            onClick={() => setSelectedTab(1)}
          >
            Shop
          </div>
          <div
            className={`text-nowrap px-4 py-1 transition-all duration-150 ${selectedTab !== 2 ? "opacity-60" : ""} select-none hover:cursor-pointer`}
            onClick={() => setSelectedTab(2)}
          >
            For You
          </div>
          <div className={`absolute bottom-0 h-[3px] rounded-full transition-all duration-150 bg-white ${tabUnderline(selectedTab)}`}></div>
        </div>
      </div>
      <div className="absolute top-14 right-5 z-50">
        {selectedTab === 1 && <ShoppingCartIcon className="w-6 h-6 text-white" />}
        {selectedTab === 2 && <MagnifyingGlassIcon className="w-6 h-6 text-white" />}
      </div>
      {selectedTab === 1 && <TiktokShop />}
      {selectedTab === 2 && (
        <div className="w-full h-full overflow-y-scroll no-scrollbar touch-pan-y snap-y snap-mandatory" ref={scrollContainerRef}>
          {vids && (
            <>
              {vids.map((vid: any, i: number) => (
                <div key={i} className="relative w-full h-full bg-neutral-950 overflow-hidden snap-normal snap-start">
                  <video autoPlay loop muted className="absolute h-full bottom-0 h-full object-cover">
                    <source src={vid.path} type="video/mp4" />
                    Your browser does not support this video tag.
                  </video>
                  <div id="info" className="absolute left-4 bottom-4 text-white">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold mb-1">{vid.creator}</span>
                      <span>{vid.title}</span>
                    </div>
                  </div>
                  <div id="interactions" className="absolute right-0 bottom-0 p-3 text-white">
                    <div id="avatar" className="relative">
                      <div className="w-12 h-12 bg-neutral-200 border-4 border-neutral-400 rounded-full overflow-hidden mb-6">
                        <img src={vid.avatar ?? ""} alt="avatar" />
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 stroke-[4px] text-white" />
                      </div>
                    </div>
                    <div id="like" className="flex flex-col items-center mb-4 text-sm hover:cursor-pointer group">
                      <IconTiktokLike className="mb-1" />
                      <span className="font-semibold select-none">{vid.likes}</span>
                    </div>
                    <div id="comment" className="flex flex-col items-center mb-4 text-sm">
                      <IconTiktokComment className="mb-1" />
                      <span className="font-semibold select-none">{vid.comments}</span>
                    </div>
                    <div id="bookmark" className="flex flex-col items-center mb-4 text-sm">
                      <IconTiktokBookmark className="mb-1" />
                      <span className="font-semibold select-none">{vid.bookmarks}</span>
                    </div>
                    <div id="share" className="flex flex-col items-center text-sm mb-4">
                      <IconTiktokShare className="mb-1" />
                      <span className="font-semibold select-none">{vid.shares}</span>
                    </div>
                    <div id="audio">
                      <div className="w-8 h-8 bg-neutral-200 border-4 border-neutral-400 rounded-full overflow-hidden mx-auto"></div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="relative w-full h-full bg-gradient-to-b from-yellow-500 to-accent flex items-center justify-center overflow-hidden snap-normal snap-start">
                <motion.div initial={{ scale: 0.1 }} whileInView={{ scale: 1, transition: { type: "spring", damping: 5, stiffness: 100 } }}>
                  <h3 className="text-white font-semibold text-2xl mb-4 text-center">Great deals that fits your style!</h3>
                  <div className="bg-white rounded-lg mx-auto w-[90%] px-4 py-6 flex flex-col items-center">
                    <div className="bg-neutral-300 rounded-md w-1/2 aspect-square overflow-hidden mb-2 flex items-center justify-center">
                      {!isFetching && recommendationList ? <img src={recommendationList[0]} className="w-full h-full" alt="" /> : <DotLoader color="#FE2858" />}
                    </div>

                    <div className="text-lg mb-4">
                      <span className="text-neutral-400 line-through mr-2">$59.99</span>
                      <span className="text-accent font-bold">$19.99</span>
                    </div>

                    <div className="flex gap-2 font-semibold mb-6">
                      <button
                        className="flex items-center gap-1 bg-cyan-300 hover:bg-cyan-200 transition-all duration-150 px-4 py-2 rounded-md text-nowrap"
                        onClick={openTryonDialog}
                      >
                        {isTryonBtnLoading ? <ClipLoader className="!w-6 !h-6" /> : <IconClothesTok />}
                        <span>Try it on</span>
                      </button>
                      <button
                        className="flex items-center gap-1 bg-accent hover:bg-red-400 transition-all duration-150 text-white px-4 py-2 rounded-md text-nowrap"
                        onClick={() => setAddToCart(true)}
                      >
                        {addToCart ? (
                          <>
                            <CheckIcon className="w-6 h-6" />
                            <span>Item added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCartIcon className="w-6 h-6" />
                            <span>Add to cart</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-accent font-bold hover:underline hover:cursor-pointer" onClick={() => setSelectedTab(1)}>
                      See more &gt;&gt;
                    </div>
                  </div>
                </motion.div>
                {openTryon ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={(e) => closeTryonDialog(e)}>
                    <div className="relative w-[80%] bg-white p-8 rounded-lg">
                      <button className="absolute top-2 right-2" onClick={() => setOpenTryon(false)}>
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                      <div className="flex items-center justify-center">
                        <DotLoader loading={isImageLoading} color="#FE2858" />
                        <div className="rounded-md overflow-hidden aspect-square">
                          <img src={tryOnImageUrl} alt="Try on" className="object-fill w-full h-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
