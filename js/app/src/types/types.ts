interface Statistics {
  prediction: number
  probability: number
}

interface ApiResponse extends Statistics {
  all_predictions: Array<number>
}


export {
  Statistics,
  ApiResponse,
}
