const checkIfCanvasIsEmpty = (canvas: HTMLCanvasElement | null, context: CanvasRenderingContext2D | null) => {
  if (!(canvas && context)) {
    return false;
  }
  for(let i = 0; i< canvas.width ; i++) {
    for (let j = 0 ; j< canvas.height; j++) {
      const pixelData = context.getImageData(i, j, 1, 1).data;
      if (pixelData[0] !== 255 || pixelData[1] !== 255 || pixelData[2] !== 255) {
        return false;
      }
    }
  }
  return true;
}

export default checkIfCanvasIsEmpty;