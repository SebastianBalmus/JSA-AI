import io
import numpy as np
from PIL import Image


def process_image(image_content):
    image = Image.open(io.BytesIO(image_content))
    image = image.resize((28, 28,))
    image = np.array(image)

    # Convert the array to grayscale if necessary
    if image.shape[-1] == 4:  # RGBA image
        image = image[..., :3].mean(axis=-1)  # Convert to grayscale by taking the mean across RGB channels

    image = 255 - image  # Invert image

    return image


def normalize_image(image_content):
    image = image_content / 255.0
    image = image.reshape(1, 28, 28, 1)
    return image
