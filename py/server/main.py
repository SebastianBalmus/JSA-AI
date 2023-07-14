import os
import numpy as np
from typing import Annotated
from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from utils.PredictionResponse import PredictionResponse
from utils.image_preprocessing import process_image, normalize_image
from utils.save_feedback_data import save_feedback_data


app = FastAPI()
MODEL_PATH = os.path.abspath(os.path.join(__file__, '../../..', 'model'))

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/predict', response_model=PredictionResponse)
async def root(file: UploadFile):
    model: tf.keras.Model = tf.keras.models.load_model(MODEL_PATH)
    contents = await file.read()
    image = process_image(contents)
    image = normalize_image(image)
    prediction = model.predict([image])[0]
    return {
        'prediction': np.argmax(prediction),
        'probability': max(prediction),
        'all_predictions': list(prediction),
    }


@app.post('/collect-feedback')
async def root(file: UploadFile, label: Annotated[int, Form()]):
    contents = await file.read()
    save_feedback_data(contents, label)
    return 'ok'
