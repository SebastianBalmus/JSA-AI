import { useRef, useEffect, useCallback, MutableRefObject } from "react";

const useBrush = (
  canvas: MutableRefObject<HTMLCanvasElement | null>,
  context: MutableRefObject<CanvasRenderingContext2D | null>,
) => {
  const isDrawing: MutableRefObject<boolean> = useRef(false);
  const previousCoordinates: MutableRefObject<Array<number>> = useRef([0, 0]);

  const updateCoordinates = (e) => {
    previousCoordinates.current = [e.offsetX, e.offsetY];
  };

  const drawLine = useCallback(
    (e) => {
      if (!context.current) {
        return;
      }

      if ("beginPath" in context.current) {
        context.current.beginPath();
      }
      if ("moveTo" in context.current) {
        context.current.moveTo(...previousCoordinates.current);
      }
      if ("lineTo" in context.current) {
        context.current.lineTo(e.offsetX, e.offsetY);
      }
      if ("stroke" in context.current) {
        context.current.stroke();
      }
    },
    [context]
  );

  const drawMove = useCallback(
    (e) => {
      if (!isDrawing.current || !context.current) {
        return;
      }

      drawLine(e);
      updateCoordinates(e);
    },
    [context, drawLine]
  );

  const drawStart = useCallback((e) => {
    isDrawing.current = true;
    updateCoordinates(e);
  }, []);

  const drawStop = () => {
    isDrawing.current = false;
  };

  /**
   * SIDE-EFFECTS
   */

  useEffect(() => {
    context.current.fillStyle = '#FFFFFF';
    context.current.fillRect(0, 0, canvas.current.width, canvas.current.height);
  }, [context, canvas]);

  useEffect(() => {
    const ref = canvas.current;

    if (ref) {
      ref.addEventListener("mousedown", drawStart);
      ref.addEventListener("mousemove", drawMove);
      ref.addEventListener("mouseup", drawStop);
      ref.addEventListener("mouseout", drawStop);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("mousedown", drawStart);
        ref.removeEventListener("mousemove", drawMove);
        ref.removeEventListener("mouseup", drawStop);
        ref.removeEventListener("mouseout", drawStop);
      }
    };
  }, [canvas, drawMove, drawStart]);
};

export default useBrush;