import React, { createContext, useState, useContext, useEffect } from "react";

interface ImageContextType {
  imageUrl: string,
  displayImageUrl: string,
  setImageUrl: React.Dispatch<React.SetStateAction<string>>,
  fetchRecommendation: () => {}
  isFetching: boolean,
  recommendationList: any,
  tryOnImageUrl: string,
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode}) => {
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
    const blob = dataURLtoBlob(imageUrl);
    setDisplayedImageUrl(URL.createObjectURL(blob));
    const newImageFormData = new FormData();
    newImageFormData.append("humanFile", imageUrl);
    newImageFormData.append("clothesFile", imageUrl);
    setImageFormData(newImageFormData);
    console.log(newImageFormData.get("humanFile"))
  }, [imageUrl]);

  const fetchRecommendation = async () => {
    
    setIsFetching(true);
    const response = await fetch("http://127.0.0.1:8000/tryon", {
      method: "POST",
      body: imageFormData
    });
    setIsFetching(false);
    const data = await response.json();
    setTryOnImageUrl(data["tryOnImageUrl"]);
    console.log(data["tryOnImageUrl"])
  }

  return (
    <ImageContext.Provider value={{ imageUrl, displayImageUrl, setImageUrl, fetchRecommendation, recommendationList, isFetching, tryOnImageUrl }}>
      {children}
    </ImageContext.Provider>
  );
}

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("ImageContext must be used within an ImageProvider");
  }
  return context;
}