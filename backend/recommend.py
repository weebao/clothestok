import torch
import torchvision.transforms as transforms
from torchvision import models
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import glob
from PIL import Image
from torch.utils.data import DataLoader, Dataset
import os

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

query_image_path = "/content/output/1.jpg_Upper-clothes.png"
dataset_path = "/content/drive/MyDrive/images_original/*.jpg"
embedding_file = "/content/image_embeddings.npz"

query_image = Image.open(query_image_path).convert('RGB')
query_tensor = preprocess(query_image).unsqueeze(0).to(device)
with torch.no_grad():
    query_features = model(query_tensor).squeeze().cpu().numpy()

if os.path.exists(embedding_file):
    dataset_features, image_paths = load_embeddings(embedding_file)
else:
    dataset_images = glob.glob(dataset_path)
    dataset = ImageDataset(dataset_images)
    data_loader = DataLoader(dataset, batch_size=128, shuffle=False, num_workers=2)
    dataset_features, image_paths = extract_features_batch(model, data_loader)
    save_embeddings(dataset_features, image_paths, embedding_file)

similarities = cosine_similarity([query_features], dataset_features)[0]
top_indices = np.argsort(similarities)[-5:][::-1]
top_5_similar_images = [image_paths[idx] for idx in top_indices]

print("Top 5 most similar images:")
for idx, img_path in enumerate(top_5_similar_images, 1):
    print(f"{idx}. {img_path}")
