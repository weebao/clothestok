import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        {/* SEO Meta Tags */}
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="ClothesTok is an AI-powered fashion recommendation platform that personalizes clothing suggestions based on user appearance and trending TikTok fashion styles."
        />
        <meta
          name="keywords"
          content="AI fashion, ClothesTok, TikTok fashion, personalized clothing, fashion recommendation, ML algorithms, style suggestions"
        />
        <meta name="author" content="Bao Dang, Hung Nguyen, Hoa La" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.clothestok.vercel.app" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="ClothesTok: Your Personalized Fashion Companion" />
        <meta
          property="og:description"
          content="Discover clothes that fit your style with ClothesTok's AI-powered recommendations, inspired by TikTok's best fashion influencers."
        />
        <meta property="og:image" content="/clothestok-banner.png" />
        <meta property="og:url" content="https://www.clothestok.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ClothesTok: Your Personalized Fashion Companion" />
        <meta
          name="twitter:description"
          content="Discover clothes that fit your style with ClothesTok's AI-powered recommendations, inspired by TikTok's best fashion influencers."
        />
        <meta name="twitter:image" content="/clothestok-banner.png" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-small.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-small.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-xs.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
