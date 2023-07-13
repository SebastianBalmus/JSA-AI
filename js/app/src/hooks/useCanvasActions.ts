const useCanvasActions = (canvas, context) => {
  const clearCanvas = () => {
    context.current.fillStyle = '#FFFFFF';
    context.current.fillRect(0, 0, canvas.current.width, canvas.current.height);
  }

  const getImage = async (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      canvas.current.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to convert canvas to blob'));
          return;
        }
        resolve(blob);
      }, 'image/png');
    }) as Blob;
  }

  return {
    clearCanvas,
    getImage
  }
}

export default useCanvasActions;