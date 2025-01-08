import { useEffect, useRef } from 'react';
import { PixelPainter } from '../../../logic/renderers/PixelPainter';

export function PixelCanvas(props: {
  width: number;
  height: number;
  painterRef: React.RefObject<PixelPainter | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = props.width;
      canvas.height = props.height;
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      props.painterRef.current = new PixelPainter(context);
    }
  }, [props.height, props.width, props.painterRef]);

  return <canvas ref={canvasRef} style={{ imageRendering: 'pixelated' }} />;
}
