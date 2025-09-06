import { createContext, type JSX, useContext, useRef } from 'react';
import { Position } from '../logic/types/Position';

export type MouseButton = undefined | 'left' | 'right';

export class Mouse {
  position: Position;
  button: MouseButton;

  previousInteractionPosition: undefined | Position; // to interpolate between quick movements

  constructor() {
    this.position = new Position(0, 0);
    this.previousInteractionPosition = undefined;
    this.button = undefined;
  }

  onMove(event: React.PointerEvent, canvas: HTMLCanvasElement): void {
    const rect = canvas.getBoundingClientRect();
    this.position = new Position(
      Math.floor(((event.clientX - rect.left) * canvas.width) / rect.width),
      Math.floor(((event.clientY - rect.top) * canvas.height) / rect.height),
    );
  }

  onPress(event: React.PointerEvent): void {
    if (event.button === 0) {
      this.button = 'left';
      return;
    }
    if (event.button === 2) {
      this.button = 'right';
      return;
    }
    this.button = undefined;
  }

  onRelease(): void {
    this.button = undefined;
    this.previousInteractionPosition = undefined;
  }
}

const MouseContext = createContext<Mouse | undefined>(undefined);
export const MouseProvider = (props: { children: JSX.Element }) => {
  const mouseRef = useRef<Mouse>(new Mouse());
  return (
    <MouseContext.Provider value={mouseRef.current}>
      {props.children}
    </MouseContext.Provider>
  );
};

export function useMouse() {
  const context = useContext(MouseContext);
  if (!context) throw new Error('useMouse must be used within a MouseProvider');
  return context;
}
