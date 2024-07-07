from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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

class TryonRequest(BaseModel):
    humanImagePath: str 
    humanImageUrl: str
    clothesImagePath: str 
    clothesImageUrl: str
    
@app.post("/tryon")
def tryon_endpoint(request: TryonRequest):
    try:
        imageUrl = clothes_tryon(request.humanImagePath, request.humanImageUrl, request.clothesImagePath,request.clothesImageUrl)
        return {"imageUrl": imageUrl}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))