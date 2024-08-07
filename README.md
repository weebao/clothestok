# ClothesTok - TikTok TechJam 2024

![banner](lib/banner.png)

An AI clothes recommender trained on TikTok best fashion influencers

[Devpost Link](https://devpost.com/software/clothestok)

## What is this about?

The current TikTok's recommendation algorithm is using inputs on how users interact with videos to recommend products from TikTok shop, which is already very effective. ClothesTok hopes to elevate this even more and enhance users' tailored discovery of clothing shops by taking the user's visual features into consideration when recommending clothes products.

## Demo

[![ClothesTok](https://img.youtube.com/vi/05bMAfdcDVk/0.jpg)](https://youtu.be/05bMAfdcDVk?si=9E9W4BmkScOwPtN_)

## Table of Contents

- [Installation](#installation)
- [Running the app](#running-the-app)
- [Implementation](#implementation)
- [Members](#members)
- [Acknowledgements](#acknowledgements)

## Installation

Clone this repository
```
git clone https://github.com/weebao/clothestok.git
```
Install the necessary modules for the backend
```
cd backend
pip install -r requirements.txt
```
Do the same for the frontend
```
cd frontend
npm install
```

## Running the app

To run this app in development mode, you will need to run both the backend and the frontend at the same time locally.
- Running the backend:
```
cd backend
uvicorn main:app --reload
```
- Running the frontend:
```
cd frontend
npm run dev
```

## Implementation
### Tech stacks:
- Backend: FastAPI, SegFormer, Torch, Scikit-learn, Deployed on Render - 512 MB RAM so it might not run if too many people are using
- Frontend: Next.js, TailwindCSS, Deployed on Vercel
- APIs used: TikTok's API, HuggingFace's API
### Backend Architecture
![architecture](/lib/architecture-img.png)

## Members
- [Hung Nguyen](https://github.com/HungNT1st)
- [Hoa La](https://github.com/lvhoaa)
- [Bao Dang](https://github.com/weebao)

## Acknowledgements
Special shoutout for [@levihsu](https://github.com/levihsu) for the powerful OOT diffusion model which was a great help when building our products!

[Back to top](#clothestok---tiktok-techjam-2024)
