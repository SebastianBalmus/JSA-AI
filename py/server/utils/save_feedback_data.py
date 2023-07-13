import os
import csv
from .image_preprocessing import process_image


def save_feedback_data(image_content, label):
    image = process_image(image_content)
    keys = [[f'{i}x{j}' for j in range(28)] for i in range(28)]
    keys = [key for sublist in keys for key in sublist]
    flattened_image = [pixel for row in image for pixel in row]

    values = {'label': label}
    values.update({key: int(value) for key, value in zip(keys, flattened_image)})

    csv_path = os.path.join(__file__, '../../../..', 'data', 'feedback.csv')

    with open(csv_path, 'a', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=values.keys())
        writer.writerow(values)
