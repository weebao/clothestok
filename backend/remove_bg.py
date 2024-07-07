import cv2
import torch
import torch.nn as nn
from transformers import SegformerImageProcessor, AutoModelForSemanticSegmentation
from PIL import Image
import numpy as np
import logging
import sys

# Initialize the model and processor
processor = SegformerImageProcessor.from_pretrained("mattmdjaga/segformer_b2_clothes")
model = AutoModelForSemanticSegmentation.from_pretrained("mattmdjaga/segformer_b2_clothes").eval()

# Define clothing labels
clothing_labels = {
    4: "Upper-clothes",
    5: "Skirt",
    6: "Pants",
    7: "Dress"
}

keep_labels = {
    2: "Hair",
    4: "Upper-clothes",
    5: "Skirt",
    6: "Pants",
    7: "Dress",
    11: "Face",
    12: "Left-leg",
    13: "Right-leg",
    14: "Left-arm",
    15: "Right-arm"
}

def process_image(image):
    inputs = processor(images=image, return_tensors="pt")
    
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

def remove_background(image, pred_seg):
    keep_mask = np.zeros_like(pred_seg, dtype=bool)
    for label in keep_labels.keys():
        keep_mask |= (pred_seg == label)
    
    # result = np.zeros((image.shape[0], image.shape[1], 4), dtype=np.uint8)
    # result[keep_mask, :3] = image[keep_mask]
    # result[keep_mask, 3] = 255  
    result = np.ones_like(image) * 255
    result[keep_mask] = image[keep_mask]
    
    return result

def body_extractor(image_data):
    logging.basicConfig(level=logging.INFO)
    logging.info('Processing image')
    
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if image is None:
        logging.error("Error: Could not read the image.")
        return None
    
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(image_rgb)
    pred_seg = process_image(pil_image)
    result = remove_background(image_rgb, pred_seg)
    
    logging.info("Processing completed.")
    return result

def extract_clothing(image, pred_seg):
    clothing_mask = np.zeros_like(pred_seg, dtype=bool)
    for label in clothing_labels.keys():
        clothing_mask |= (pred_seg == label)
    
    result = np.ones_like(image) * 255
    
    result[clothing_mask] = image[clothing_mask]
    
    return result

def clothing_extractor(image_data):
    logging.basicConfig(level=logging.INFO)
    logging.info('Processing image')
    
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if image is None:
        logging.error("Error: Could not read the image.")
        return None
    
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(image_rgb)
    
    pred_seg = process_image(pil_image)
    
    result = extract_clothing(image, pred_seg)
    
    logging.info("Processing completed.")
    return result