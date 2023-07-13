import React from "react";
import './Canvas.css';

interface CanvasProps {
  canvasRef: React.Ref<any>;
  width: number;
  height: number;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const { canvasRef, width, height } = props;

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
}

Canvas.defaultProps = {
  width: 300,
  height: 300
}

export default Canvas;