import "@/index.css";
import React from "react";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head";
import { ImageProvider } from "@/context/ImageContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>ClothesTok</title>
      </Head>
      <ImageProvider>
        <Component {...pageProps} />
        <Analytics />
      </ImageProvider>
    </>
  );
};

export default App;
