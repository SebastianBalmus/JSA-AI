import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../types/types";

async function sendImage(image: Blob): Promise<AxiosResponse<ApiResponse>> {
  return axios.post(
    'http://localhost:8000/predict',
    {
      file: image,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    }
  );
}

async function sendFeedback(image: Blob, label: number) {
  return axios.post(
    'http://localhost:8000/collect-feedback',
    {
      file: image,
      label,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    }
  )
}

export { sendImage, sendFeedback };
