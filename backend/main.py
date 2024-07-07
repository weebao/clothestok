from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Annotated
from try_on import clothes_tryon

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
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

@app.post("/tryon")
async def tryon_endpoint(humanFile: Annotated[bytes, File()], clothesFile: Annotated[bytes, File()]):
    try:        
        imageUrl = clothes_tryon(humanFile, clothesFile)
        return {"tryOnImageUrl": imageUrl}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))