from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Annotated
# from try_on import clothes_tryon
from try_on_gradio_client import clothes_tryon
# from try_on_gradio_client import clothes_tryon
from recommend import get_rec
import requests
import io 
import numpy as np
from PIL import Image
from extract_pic import extract_pic_func
from remove_bg import clothing_extractor, body_extractor

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello from ClothesTok :)"}

@app.post('/recommend')
async def recommend(humanFile: Annotated[bytes, File()]):
    # extract_pic + get recommended clothes   
    links = get_rec(humanFile)
    human_bg_removed = np.array(body_extractor(humanFile))
    body_image = Image.fromarray(human_bg_removed)
    body_buffer = io.BytesIO()
    body_image.save(body_buffer, format='WEBP')
    
    # try on best-suited
    response = requests.get(links[0])
    # remove background from clothes image
    bg_removed = np.array(clothing_extractor(response.content))
    clothes_image = Image.fromarray(bg_removed)
    clothes_buffer = io.BytesIO()
    clothes_image.save(clothes_buffer, format='JPEG')
    # print(response.content)
    try:
        tryOnUrl = clothes_tryon(humanFile, io.BytesIO(clothes_buffer.getvalue()))
        return {"bestFitLinks": links, "tryOnUrl": tryOnUrl} 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.post("/tryon")
async def tryon_endpoint(humanFile: Annotated[bytes, File()], clothesFile: Annotated[bytes, File()]):
    try:        
        imageUrl = clothes_tryon(humanFile, clothesFile)
        return {"tryOnImageUrl": imageUrl}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))