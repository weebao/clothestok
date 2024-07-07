import cv2
import torch
import torch.nn as nn
from transformers import SegformerImageProcessor, AutoModelForSemanticSegmentation
from PIL import Image
import numpy as np
import pathlib
import logging
import sys
import os

processor = SegformerImageProcessor.from_pretrained("mattmdjaga/segformer_b2_clothes")
model = AutoModelForSemanticSegmentation.from_pretrained("mattmdjaga/segformer_b2_clothes").eval()

# Define body part labels
body_part_labels = {
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

# Define clothing item labels
clothing_labels = {
    4: "Upper-clothes",
    5: "Skirt",
    6: "Pants",
    7: "Dress"
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

def extract_body(image, pred_seg):
    body_mask = np.zeros_like(pred_seg, dtype=bool)
    for label in body_part_labels.keys():
        body_mask |= (pred_seg == label)
    
    body = np.zeros_like(image)
    body[body_mask] = image[body_mask]
    
    return body, body_mask

def extract_skin_color(image, pred_seg):
    face_mask = pred_seg == 11  # Face label
    face_pixels = image[face_mask]
    if len(face_pixels) > 0:
        return np.median(face_pixels, axis=0)
    return None

def create_skin_color_image(image, body_mask, skin_color):
    skin_image = np.zeros_like(image)
    skin_image[body_mask] = skin_color
    return skin_image

def save_clothing_images(image, pred_seg, output_dir, image_name):
    # Check presence of clothing items
    clothing_items = {label: (pred_seg == label).any() for label in clothing_labels.keys()}
    
    # Enforce conditions
    if clothing_items[7]:  # Dress
        clothing_items = {label: (label == 7) for label in clothing_items.keys()}
    elif clothing_items[6]:  # Pants
        clothing_items[5] = False
    elif clothing_items[5]:  # Skirt
        clothing_items[6] = False
    
    # Save images
    for label, present in clothing_items.items():
        if present:
            mask = (pred_seg == label)
            clothing_image = np.zeros_like(image)
            clothing_image[mask] = image[mask]
            clothing_image_path = output_dir / f"{image_name}_{clothing_labels[label].lower()}.png"
            cv2.imwrite(str(clothing_image_path), clothing_image)
            logging.info(f'Saved {clothing_labels[label]} image')

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python script.py <image_path>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    image_name = os.path.splitext(os.path.basename(image_path))[0]
    output_dir = pathlib.Path("output")
    output_dir.mkdir(exist_ok=True)
    
    logging.basicConfig(level=logging.INFO)
    
    # Read the image
    image = cv2.imread(image_path)
    if image is None:
        logging.error("Error: Could not read the image.")
        sys.exit(1)
    
    # Convert to RGB for processing
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(image_rgb)
    
    logging.info('Processing image')
    pred_seg = process_image(pil_image)
    
    # Extract body
    body, body_mask = extract_body(image, pred_seg)
    body_path = output_dir / f"{image_name}_body.png"
    cv2.imwrite(str(body_path), body)
    logging.info('Saved body image')
    
    # Extract skin color and create skin color image
    skin_color = extract_skin_color(image, pred_seg)
    if skin_color is not None:
        skin_image = create_skin_color_image(image, body_mask, skin_color)
        skin_image_path = output_dir / f"{image_name}_skin_color.png"
        cv2.imwrite(str(skin_image_path), skin_image)
        logging.info('Saved skin color image')
    else:
        logging.warning('Could not extract skin color')
    
    # Save clothing images
    save_clothing_images(image, pred_seg, output_dir, image_name)
    
    logging.info("Processing completed.")
