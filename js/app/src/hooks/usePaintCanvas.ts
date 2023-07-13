import {MutableRefObject, useEffect, useRef} from "react";
import { DEFAULT_BRUSH } from "../utils/defaultBrush.ts";
import useBrush from "./useBrush";

const usePaintCanvas = () => {
  const canvas: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
  const context: MutableRefObject<CanvasRenderingContext2D | null> = useRef(null);

  const getCanvasContext = () => {
    if (!canvas.current) {
      return;
    }

    if ("getContext" in canvas.current) {
      context.current = canvas.current.getContext("2d");
    }
  };

  const configureCanvasBrush = () => {
    if (!context.current) {
      return;
    }

    Object.assign(context.current, DEFAULT_BRUSH);
  };

  useEffect(getCanvasContext, []);
  useEffect(configureCanvasBrush, []);

  /**
   * CUSTOM HOOKS
   */

  useBrush(canvas, context);

  /**
   * RETURN STATEMENT
   */

  return {
    canvas,
    context,
  };
};

export default usePaintCanvas;