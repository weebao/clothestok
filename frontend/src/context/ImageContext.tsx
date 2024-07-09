import React, { createContext, useState, useContext, useEffect } from "react";

interface ImageContextType {
  imageUrl: string;
  displayImageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  fetchRecommendation: () => {};
  isFetching: boolean;
  recommendationList: string[];
  tryOnImageUrl: string;
  resetAll: () => void;
}

const API_URL = process.env.API_URL;

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [displayImageUrl, setDisplayedImageUrl] = useState<string>("");
  const [tryOnImageUrl, setTryOnImageUrl] = useState<string>("");
  const [imageFormData, setImageFormData] = useState<FormData>(new FormData());
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [recommendationList, setRecommendationList] = useState<any>([]);

  const dataURLtoBlob = (dataURL: string) => {
    if (!dataURL) return new Blob();

    const arr = dataURL.split(",");
    const matchResult = arr[0].match(/:(.*?);/);
    const mime = matchResult ? matchResult[1] : "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  useEffect(() => {
    if (imageUrl === "") {
      return;
    }
    const blob = dataURLtoBlob(imageUrl);
    setDisplayedImageUrl(URL.createObjectURL(blob));
    const newImageFormData = new FormData();
    const imageFile = new File([blob], "upload.webp", { type: "image/webp" });
    newImageFormData.append("humanFile", imageFile);
    setImageFormData(newImageFormData);
  }, [imageUrl]);

  const fetchRecommendation = async () => {
    try {
      setIsFetching(true);
      console.log(API_URL)
      const response = await fetch(`${API_URL}/recommend`, {
        method: "POST",
        body: imageFormData,
      });
      console.log(response)
      setIsFetching(false);
      const data = await response.json();
      setTryOnImageUrl(data["tryOnUrl"]);
      setRecommendationList(data["bestFitLinks"])
    } catch (error) {
      alert("An error occurred while fetching recommendation.");
    }
  };

  const resetAll = () => {
    setImageUrl("");
    setDisplayedImageUrl("");
    setTryOnImageUrl("");
    setImageFormData(new FormData());
    setIsFetching(false);
    setRecommendationList([]);
  }

  return (
    <ImageContext.Provider value={{ imageUrl, displayImageUrl, setImageUrl, fetchRecommendation, recommendationList, isFetching, tryOnImageUrl, resetAll }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("ImageContext must be used within an ImageProvider");
  }
  return context;
};
