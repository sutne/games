import { useEffect, useRef } from 'react';
import { useMouse } from '../../../contexts/Mouse';

export function InteractionCanvas(props: {
  width: number;
  height: number;
  onKeyPress?: (key: string) => void;
}) {
  const mouse = useMouse();
  const interactionCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interactionCanvas = interactionCanvasRef.current;
    if (interactionCanvas) {
      interactionCanvas.width = props.width;
      interactionCanvas.height = props.height;
    }
  }, [props.width, props.height]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => props.onKeyPress?.(e.key);
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [props.onKeyPress]);

  useEffect(() => {
    const handleMouseUp = () => mouse.onRelease();
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouse.onRelease]);

  const style = getStyle();
  return (
    <canvas
      ref={interactionCanvasRef}
      onContextMenu={(e) => e.preventDefault()}
      onPointerMove={(e) => {
        if (interactionCanvasRef.current) {
          mouse.onMove(e, interactionCanvasRef.current);
        }
      }}
      onPointerDown={(e) => mouse.onPress(e)}
      onPointerUp={(_) => mouse.onRelease()}
      style={style.interactionCanvas}
    />
  );

  function getStyle() {
    return {
      interactionCanvas: {
        cursor: 'crosshair',
      },
    };
  }
}
