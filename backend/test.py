# Import necessary libraries
import cv2
import matplotlib.pyplot as plt
from IPython.display import display, Image
import requests
from io import BytesIO
import numpy as np

from remove_bg import clothing_extractor

# Function to display images side by side
def display_images(original, processed):
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 7))
    
    ax1.imshow(cv2.cvtColor(original, cv2.COLOR_BGR2RGB))
    ax1.set_title('Original Image')
    ax1.axis('off')
    
    ax2.imshow(cv2.cvtColor(processed, cv2.COLOR_BGR2RGB))
    ax2.set_title('Processed Image (Clothing Only)')
    ax2.axis('off')
    
    plt.tight_layout()
    plt.show()

# URL of a sample image (replace with your own image URL if desired)
image_url = "https://drive.google.com/thumbnail?id=1yzHiGpyOptvp4Q-6CKPyW26dDGfUmStQ&sz=w1000 "

# Download the image
response = requests.get(image_url)
image_data = response.content

# Process the image
result = clothing_extractor(image_data)

# Read the original image for comparison
original_image = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_COLOR)

# Display the original and processed images side by side
display_images(original_image, result)

# Optionally, save the processed image
cv2.imwrite('processed_clothing.jpg', cv2.cvtColor(result, cv2.COLOR_RGB2BGR))
print("Processed image saved as 'processed_clothing.jpg'")