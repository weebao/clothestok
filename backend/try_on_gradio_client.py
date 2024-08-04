import requests
import json 
import secrets
import string
from gradio_client import Client, handle_file
from dotenv import load_dotenv
from fastapi import FastAPI
from typing import Annotated
from fastapi import FastAPI, HTTPException, Request, File, UploadFile, Form


def generate_random_hash(length=11):
    return ''.join(secrets.choice(string.ascii_lowercase + string.digits) for _ in range(length))

# diffusion_url = "https://levihsu-ootdiffusion.hf.space/queue/join?"
image_upload_url = "https://levihsu-ootdiffusion.hf.space/file="
session_hash = generate_random_hash()
upload_id = generate_random_hash()

def upload_file(humanFile, clothesFile):
    uploadUrl = "https://levihsu-ootdiffusion.hf.space/upload?upload_id=" + upload_id
    humanPath = clothesPath = None 
    
    files = {'files': humanFile} 
    response = requests.post(uploadUrl, files=files)
    humanPath = response.json()[0]

    files = {'files': clothesFile} 
    response = requests.post(uploadUrl, files=files)
    clothesPath = response.json()[0]
    
    return humanPath, clothesPath


def clothes_tryon(humanFile, clothesFile):
    humanPath, clothesPath = upload_file(humanFile, clothesFile)
    print('obtained humanLink and clothesLink: ', image_upload_url + humanPath, image_upload_url + clothesPath)
    client = Client("levihsu/OOTDiffusion")
    print('running gradio client')
    result = client.predict(
        vton_img=handle_file(image_upload_url + humanPath),
        garm_img=handle_file(image_upload_url + clothesPath),
        n_samples=1,
        n_steps=20,
        image_scale=2,
        seed=-1,
        api_name="/process_hd"
    )
    print(result)
    return result[0]['image']


load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "*",
]

@app.post("/tryon")
async def tryon_endpoint(humanFile: Annotated[bytes, File()], clothesFile: Annotated[bytes, File()]):
    try:        
        imageUrl = clothes_tryon(humanFile, clothesFile)
        return {"tryOnImageUrl": imageUrl}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))