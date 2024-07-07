from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Annotated
from try_on import clothes_tryon
from recommend import get_rec
import requests
import io 
from extract_pic import extract_pic_func

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3001",
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
    return {"message": "Hello World"}

@app.post('/recommend')
async def recommend(humanFile: Annotated[bytes, File()]):
    # extract_pic + get recommended clothes 
    # img_path = "humanfile.jpg"
    # with open(img_path, 'wb') as f:
    #     f.write(humanFile)
    # links = get_rec(img_path)
    
    links = get_rec(humanFile)
    
    # try on best-suited
    response = requests.get(links[0])
    tryOnUrl = clothes_tryon(humanFile, io.BytesIO(response.content))
    
    return {"bestFitLinks": links, "tryOnUrl": tryOnUrl} 



@app.post("/tryon")
async def tryon_endpoint(humanFile: Annotated[bytes, File()], clothesFile: Annotated[bytes, File()]):
    try:        
        imageUrl = clothes_tryon(humanFile, clothesFile)
        return {"tryOnImageUrl": imageUrl}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))