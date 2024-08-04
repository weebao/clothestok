import requests
import json 
import secrets
import string

def generate_random_hash(length=11):
    return ''.join(secrets.choice(string.ascii_lowercase + string.digits) for _ in range(length))

diffusion_url = "https://levihsu-ootdiffusion.hf.space/queue/join?"
image_upload_url = "https://levihsu-ootdiffusion.hf.space/file="
session_hash = generate_random_hash()
upload_id = generate_random_hash()

def upload_file(humanFile, clothesFile):
    uploadUrl = "https://levihsu-ootdiffusion.hf.space/upload?upload_id=" + upload_id
    humanPath = clothesPath = None 
    
    files = {'files': humanFile} 
    response = requests.post(uploadUrl, files=files)
    print("Response:", response.json())
    humanPath = response.json()[0]

    files = {'files': clothesFile} 
    response = requests.post(uploadUrl, files=files)
    clothesPath = response.json()[0]
    
    return humanPath, clothesPath

def clothes_tryon(humanFile, clothesFile):

    humanPath, clothesPath = upload_file(humanFile, clothesFile)
    print(image_upload_url + humanPath, image_upload_url + clothesPath)

    # return ""
    payload = {
        "data": [
            {
                "path": humanPath, # "/tmp/gradio/0dc2e5ca0e97bcd0c46950316bda838a46167da4/meou.png", 
                "url": image_upload_url + humanPath, # "https://levihsu-ootdiffusion.hf.space/file=/tmp/gradio/0dc2e5ca0e97bcd0c46950316bda838a46167da4/meou.png",
                "size": None,
                "mime_type": "image/png",
                "meta": {
                    "_type": "gradio.FileData"
                }
            },
            {
                "path": clothesPath, # "/tmp/gradio/17c62353c027a67af6f4c6e8dccce54fba3e1e43/048554_1.jpg"
                "url":  image_upload_url + clothesPath, #"https://levihsu-ootdiffusion.hf.space/file=/tmp/gradio/17c62353c027a67af6f4c6e8dccce54fba3e1e43/048554_1.jpg",
                "size": None,
                "mime_type": None,
                "is_stream": False,
                "meta": {
                    "_type": "gradio.FileData"
                }
            },
            "Upper-body",
            1,
            20,
            2,
            -1
        ],
        "event_data": None,
        "fn_index": 2,
        "trigger_id": 17,
        "session_hash": session_hash
    }

    response = requests.post(diffusion_url, json=payload)

    if response.status_code == 200:
        print('Clothes try-on request succeeded')

        nextUrl = "https://levihsu-ootdiffusion.hf.space/queue/data?session_hash=" + session_hash
        
        nextResponse = requests.get(nextUrl,stream=True)
        
        for line in nextResponse.iter_lines():
            if line:
                decoded_line = line.decode('utf-8')
                print(decoded_line)
                if decoded_line.startswith('data: '):
                    data = decoded_line[len('data: '):]
                    try:
                        json_data = json.loads(data)
                        
                        # Check for the message type
                        if json_data.get('msg') == 'process_completed':
                            print('Output image link:')
                            print(json_data['output']['data'][0][0]['image']['url'])
                            return json_data['output']['data'][0][0]['image']['url']
                            
                    except json.JSONDecodeError:
                        print('Failed to decode JSON:', decoded_line)

    else:
        print('Request failed with status code:', response.status_code)
