import logging
import torch
import torchvision.transforms as transforms
from torchvision import models
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import glob
from PIL import Image
from torch.utils.data import DataLoader, Dataset
import os
import json 
from extract_pic import extract_pic_func


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = models.efficientnet_b2(pretrained=True)
model = torch.nn.Sequential(*list(model.children())[:-1]).to(device)
model.eval()

preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

class ImageDataset(Dataset):
    def __init__(self, image_paths):
        self.image_paths = image_paths

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        img_path = self.image_paths[idx]
        img = Image.open(img_path).convert('RGB')
        img_tensor = preprocess(img)
        return img_tensor, img_path

def extract_features_batch(model, data_loader):
    features = []
    image_paths = []
    with torch.no_grad():
        for imgs, paths in data_loader:
            imgs = imgs.to(device)
            output = model(imgs)
            output = output.squeeze(-1).squeeze(-1).cpu().numpy()
            features.extend(output)
            image_paths.extend(paths)
    return features, image_paths

def save_embeddings(features, image_paths, embedding_file):
    np.savez(embedding_file, features=features, image_paths=image_paths)

def load_embeddings(embedding_file):
    data = np.load(embedding_file, allow_pickle=True)
    return data['features'], data['image_paths']

def find_link_from_filename(filename):
    with open('clothes.json', 'r') as json_file:
        data = json.load(json_file)
    return data[filename]

def process_link(link):
    import re

    # Extract the file ID from the given URL
    match = re.search(r'/d/([^/]+)/', drive_link)
    if not match:
        raise ValueError("Invalid Google Drive file URL")
    
    file_id = match.group(1)
    
    # Construct the download link
    download_link = f"https://drive.usercontent.google.com/download?id={file_id}&export=view&authuser=0"
    
    return download_link

def get_rec(image): # image_path = "1.jpg"
    embedding_file = "image_embeddings.npz"

    query_image_array = extract_pic_func(image)
    query_image = Image.fromarray(query_image_array).convert('RGB')
    query_tensor = preprocess(query_image).unsqueeze(0).to(device)
    with torch.no_grad():
        query_features = model(query_tensor).squeeze().cpu().numpy()

    if os.path.exists(embedding_file):
        dataset_features, image_paths = load_embeddings(embedding_file)
    else:
        logging.error("Error: Embedding file not found.")

    similarities = cosine_similarity([query_features], dataset_features)[0]
    top_indices = np.argsort(similarities)[-5:][::-1]
    top_5_similar_images = [image_paths[idx] for idx in top_indices]
    links = []
    for img_path in top_5_similar_images:
        filename = img_path.split('/')[-1]
        link = find_link_from_filename(filename)
        links.append(process_link(link))
    return links



if __name__ == "__main__":
    print(get_rec())