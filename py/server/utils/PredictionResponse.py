from pydantic import BaseModel
import numpy as np


class PredictionResponse(BaseModel):
    prediction: np.int
    probability: np.float
    all_predictions: list[np.float]
