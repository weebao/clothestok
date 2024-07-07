import React, { createContext, useState, useContext, useEffect } from "react";

interface ImageContextType {
  imageUrl: string,
  displayImageUrl: string,
  setImageUrl: React.Dispatch<React.SetStateAction<string>>,
  fetchRecommendation: () => {}
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [displayImageUrl, setDisplayedImageUrl] = useState<string>("");
  const [imageFormData, setImageFormData] = useState<FormData>(new FormData());

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
    setImageFormData(new FormData());
    imageFormData.append("files", imageUrl);
  }, [imageUrl]);

  const fetchRecommendation = async () => {
    const response = await fetch("http://127.0.0.1:8000/try_on", {
      method: "POST",
      body: imageFormData
    });
  }

  return (
    <ImageContext.Provider value={{ imageUrl, displayImageUrl, setImageUrl, fetchRecommendation }}>
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