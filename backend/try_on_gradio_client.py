import requests
import json 
import secrets
import string
from gradio_client import Client, handle_file


def generate_random_hash(length=11):
    return ''.join(secrets.choice(string.ascii_lowercase + string.digits) for _ in range(length))

# diffusion_url = "https://levihsu-ootdiffusion.hf.space/queue/join?"
image_upload_url = "https://levihsu-ootdiffusion.hf.space/file="
session_hash = generate_random_hash()
upload_id = generate_random_hash()

def upload_file(file):
    upload_url = "https://levihsu-ootdiffusion.hf.space/upload?upload_id=" + upload_id
    path = None 
    
    files = {'files': file} 
    response = requests.post(upload_url, files=files)
    path = response.json()[0]
    
    return path


def clothes_tryon(humanFile, clothesFile):
    human_path, clothes_path = upload_file(humanFile), upload_file(clothesFile)
    print('obtained humanLink and clothesLink: ', image_upload_url + human_path, image_upload_url + clothes_path)
    client = Client("levihsu/OOTDiffusion")
    print('running gradio client')
    result = client.predict(
        vton_img=handle_file(image_upload_url + human_path),
        garm_img=handle_file(image_upload_url + clothes_path),
        n_samples=1,
        n_steps=20,
        image_scale=2,
        seed=-1,
        api_name="/process_hd"
    )
    image_path = result[0]['image']
    print(image_path)
    image_url = image_upload_url
    with open(image_path, 'rb') as f:
        image = f.read()
        image_url += upload_file(image)
        print("RESULT:", image_url)
    return image_url

if __name__ == "__main__":
    from dotenv import load_dotenv
    from fastapi import FastAPI
    from typing import Annotated
    from fastapi import FastAPI, HTTPException, Request, File, UploadFile, Form
    
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