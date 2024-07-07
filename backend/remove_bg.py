import cv2
import torch
import torch.nn as nn
from transformers import SegformerImageProcessor, AutoModelForSemanticSegmentation
from PIL import Image
import numpy as np

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
processor = SegformerImageProcessor.from_pretrained("mattmdjaga/segformer_b2_clothes")
model = AutoModelForSemanticSegmentation.from_pretrained("mattmdjaga/segformer_b2_clothes").to(device).eval()

clothing_labels = {
    4: "Upper-clothes",
    5: "Skirt",
    6: "Pants",
    7: "Dress"
}

def process_image(image):
    inputs = processor(images=image, return_tensors="pt").to(device)
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits.cpu()
    upsampled_logits = nn.functional.interpolate(
        logits,
        size=image.size[::-1],
        mode="bilinear",
        align_corners=False,
    )
    pred_seg = upsampled_logits.argmax(dim=1)[0].numpy()
    return pred_seg

def extract_clothing_items(image, pred_seg):
    clothing_images = {}
    clothing_items = {label: (pred_seg == label).any() for label in clothing_labels.keys()}
    if clothing_items[7]:
        clothing_items = {label: (label == 7) for label in clothing_items.keys()}
    elif clothing_items[6]:
        clothing_items[5] = False
    elif clothing_items[5]:
        clothing_items[6] = False
    for label, present in clothing_items.items():
        if present:
            mask = (pred_seg == label)
            clothing_image = np.ones_like(image) * 255  
            clothing_image[mask] = image[mask]
            clothing_images[label] = clothing_image
    return clothing_images

def detect_and_extract_clothes(image_byte_file):
    image = cv2.imdecode(np.frombuffer(image_byte_file.read(), np.uint8), -1)
    if image is None:
        raise ValueError("Error: Could not read the image")
    
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(image_rgb)
    pred_seg = process_image(pil_image)
    
    clothing_images = extract_clothing_items(image, pred_seg)
    
    return clothing_images