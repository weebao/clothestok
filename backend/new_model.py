import requests
import json 

url = "https://levihsu-ootdiffusion.hf.space/queue/join?"
session_hash = "8dd1sr4b7ua"

def upload_file(humanFile, clothesFile):
    uploadUrl = "https://yisol-idm-vton.hf.space/upload?upload_id=y6ij0e5ervi"  # "https://yisol-idm-vton.hf.space/upload" # "https://yisol-idm-vton.hf.space/upload?upload_id=boqov3k56gv"
    uploadUrlPure = "https://yisol-idm-vton.hf.space/upload"
    humanPath = clothesPath = None 
    
    files = {'files': clothesFile} 
    response = requests.post(uploadUrl, files=files)
    clothesPath = response.json()[0]
    
    files = {'files': humanFile} 
    response = requests.post(uploadUrlPure, files=files)
    humanPath = response.json()[0]
  
    return humanPath, clothesPath

def clothes_tryon(humanFile, clothesFile):
    humanPath, clothesPath = upload_file(humanFile, clothesFile)
    print(humanPath, clothesPath)
    
    payload = {
        "data": [
            {
                "background": {
                    "meta": {
                        "_type": "gradio.FileData"
                    },
                    "path": humanPath,
                    "url": "https://yisol-idm-vton.hf.space/file=" + humanPath, # background is human image 
                    # "orig_name": "background.png",
                    # "size": 2748159,
                    "mime_type": ""
                },
                "layers": [
                    {
                        "meta": {
                            "_type": "gradio.FileData"
                        },
                        "path": "/tmp/gradio/3958da4d7bca287c0bc4c7bbec26819c22adaab5/layer_0.png",
                        "url": "https://yisol-idm-vton.hf.space/file=/tmp/gradio/3958da4d7bca287c0bc4c7bbec26819c22adaab5/layer_0.png", # layers is pure white image
                        "orig_name": "layer_0.png",
                        # "size": 24043,
                        "mime_type": ""
                    }
                ],
                "composite": {
                    "meta": {
                        "_type": "gradio.FileData"
                    },
                    "path": humanPath,
                    "url": "https://yisol-idm-vton.hf.space/file=" + humanPath, # composite is human image 
                    # "orig_name": "composite.png",
                    # "size": 2748159,
                    "mime_type": ""
                }
            },
            {
                "meta": {
                    "_type": "gradio.FileData"
                },
                "path": clothesPath,
                "url": "https://yisol-idm-vton.hf.space/file=" + clothesPath, # clothes image 
                # "orig_name": "tshirt.jfif",
                # "size": 4139,
                "mime_type": "image/jpeg"
            },
            "",
            True,
            False,
            30,
            42
        ],
        "event_data": None,
        "fn_index": 2,
        "trigger_id": 25,
        "session_hash": session_hash
    }

    response = requests.post(url, json=payload)

    if response.status_code == 200:
        print('Clothes try-on request succeeded')

        nextUrl = "https://yisol-idm-vton.hf.space/queue/data?session_hash=" + session_hash
        
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
                            print(json_data['output']['data'][0]['url'])
                            return json_data['output']['data'][0]['url']
                            
                    except json.JSONDecodeError:
                        print('Failed to decode JSON:', decoded_line)

    else:
        print('Request failed with status code:', response.status_code)
