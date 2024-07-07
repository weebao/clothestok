import requests
import json 

url = "https://levihsu-ootdiffusion.hf.space/queue/join?"
session_hash = "gjict8mzoa8"

payload = {
    "data": [
        {
            "path": "/tmp/gradio/0dc2e5ca0e97bcd0c46950316bda838a46167da4/meou.png", 
            "url": "https://levihsu-ootdiffusion.hf.space/file=/tmp/gradio/0dc2e5ca0e97bcd0c46950316bda838a46167da4/meou.png",
            "orig_name": "meou.png",
            "size": None,
            "mime_type": "image/png",
            "meta": {
                "_type": "gradio.FileData"
            }
        },
        {
            "path": "/tmp/gradio/17c62353c027a67af6f4c6e8dccce54fba3e1e43/048554_1.jpg", # /tmp/gradio/17c62353c027a67af6f4c6e8dccce54fba3e1e43/048554_1.jpg
            "url": "https://levihsu-ootdiffusion.hf.space/file=/tmp/gradio/17c62353c027a67af6f4c6e8dccce54fba3e1e43/048554_1.jpg",
            "size": None,
            "orig_name": "048554_1.jpg",
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
    "fn_index": 8,
    "trigger_id": 42,
    "session_hash": session_hash
}

response = requests.post(url, json=payload)

if response.status_code == 200:
    print('Clothes try-on request succeeded')

    nextUrl = "https://levihsu-ootdiffusion.hf.space/queue/data?session_hash=" + session_hash
    
    nextResponse = requests.get(nextUrl,stream=True)
    
    for line in nextResponse.iter_lines():
        if line:
            decoded_line = line.decode('utf-8')
            if decoded_line.startswith('data: '):
                data = decoded_line[len('data: '):]
                try:
                    json_data = json.loads(data)
                    
                    # Check for the message type
                    if json_data.get('msg') == 'process_completed':
                        print('Output image link:')
                        print(json_data['output']['data'][0][0]['image']['url'])
                        break 
                        
                except json.JSONDecodeError:
                    print('Failed to decode JSON:', decoded_line)

else:
    print('Request failed with status code:', response.status_code)


