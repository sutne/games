import { useEffect, useRef } from 'react';
import { PixelPainter } from '../../../logic/renderers/PixelPainter';

export function Canvas(props: {
  width: number;
  height: number;
  painterRef: React.RefObject<PixelPainter | null>;
}) {
  const worldCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const worldCanvas = worldCanvasRef.current;
    if (worldCanvas) {
      worldCanvas.width = props.width;
      worldCanvas.height = props.height;
      const context = worldCanvas.getContext('2d') as CanvasRenderingContext2D;
      props.painterRef.current = new PixelPainter(context);
    }
  }, [props.height, props.width, props.painterRef]);

  return <canvas ref={worldCanvasRef} id='pixel-canvas' />;
}
