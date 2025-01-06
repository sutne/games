import { Box } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
import { useTheme } from '../../../../../components/providers';
import { useRules } from '../../../contexts/Rules';
import type { World } from '../../../logic/World';
import { Position } from '../../../logic/types/Position';
import { AdjustRules } from '../../AdjustRules/AdjustRules';
import { PixelPainter } from './renderers/PixelPainter';
import './Canvas.css';
import { useMouse } from '../../../contexts/Mouse';
import { Air } from '../../../logic/elements/Air';
import { useAnimationFrame } from './hooks/useAnimationFrame';
import { TextWriter } from './renderers/TextWriter';

export function Canvas(props: {
  world: World;
}) {
  const rules = useRules();
  const mouse = useMouse();

  const worldCanvasRef = useRef<HTMLCanvasElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);
  const interactionCanvasRef = useRef<HTMLCanvasElement>(null);

  const painterRef = useRef<PixelPainter>(null);
  const writerRef = useRef<TextWriter>(null);

  useEffect(() => {
    const worldCanvas = worldCanvasRef.current;
    if (worldCanvas) {
      worldCanvas.width = props.world.width;
      worldCanvas.height = props.world.height;
      painterRef.current = new PixelPainter(
        worldCanvas.getContext('2d') as CanvasRenderingContext2D,
        props.world.width,
        props.world.height,
      );
    }
    const textCanvas = textCanvasRef.current;
    if (textCanvas) {
      textCanvas.width = textCanvas.offsetWidth;
      textCanvas.height = textCanvas.offsetHeight;
      writerRef.current = new TextWriter(
        textCanvas.getContext('2d') as CanvasRenderingContext2D,
        new Position(10, 10),
      );
    }
    const interactionCanvas = interactionCanvasRef.current;
    if (interactionCanvas) {
      interactionCanvas.width = props.world.width;
      interactionCanvas.height = props.world.height;
    }
  }, [props.world.height, props.world.width]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (rules.isPaused) {
        if (e.key === 'ArrowRight') {
          props.world.update(0.001);
        }
      }
    },
    [props.world, rules.isPaused],
  );

  useEffect(() => {
    if (rules.isDebugMode) {
      window.addEventListener('keydown', handleKeyPress);
    } else {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, [handleKeyPress, rules.isDebugMode]);

  const runRenderCycle = (elapsedSeconds: number) => {
    const writer = writerRef.current;
    const painter = painterRef.current;
    if (!painter || !writer) return;

    props.world.handleMouseInteraction(
      mouse.previousInteractionPosition,
      mouse.position,
      mouse.button,
      rules.cursorSize,
      rules.rightClickAction,
    );
    mouse.previousInteractionPosition = mouse.position;

    const startUpdate = performance.now();
    if (!rules.isPaused) {
      props.world.update(elapsedSeconds);
    }
    const endUpdate = performance.now();

    const startDraw = performance.now();
    props.world.draw(painter, rules.isDebugMode);
    const endDraw = performance.now();

    if (rules.isDebugMode) {
      const lines = [
        `FPS: ${(1 / elapsedSeconds).toFixed(0)}`,
        `draw: ${(endDraw - startDraw).toFixed(0)}ms`,
        `update: ${(endUpdate - startUpdate).toFixed(0)}ms`,
      ];
      if (props.world.isInside(mouse.position)) {
        const e = props.world.get(mouse.position);
        lines.push(
          `mouse: Pos(x=${mouse.position.int_x},y=${mouse.position.int_y}): ${e.constructor.name}`,
        );
        if (!(e instanceof Air)) {
          lines.push(
            `    Pos(x=${e.position.x.toFixed(3)},y=${e.position.y.toFixed(3)})`,
          );
          lines.push(
            `    Velocity(dx=${e.velocity.dx.toFixed(3)},dy=${e.velocity.dy.toFixed(3)})`,
          );
        }
      }
      writer.write(lines);
    } else {
      writer.clear();
    }
  };
  useAnimationFrame(runRenderCycle);

  function toggleFullscreen() {
    if (!rules.isFullscreen) {
      const dunesArea = document.getElementById('dunes') as HTMLDivElement;
      dunesArea.requestFullscreen();
      rules.setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      rules.setIsFullscreen(false);
    }
  }

  const { theme } = useTheme();
  const style = getStyle();
  return (
    <Box id='dunes' sx={style.background}>
      <Box sx={style.canvasContainer}>
        <canvas
          ref={worldCanvasRef}
          id='pixel-canvas'
          style={style.worldCanvas}
        />
        <canvas ref={textCanvasRef} />
        <canvas
          ref={interactionCanvasRef}
          onContextMenu={(e) => e.preventDefault()}
          onMouseMove={(e) => {
            if (!worldCanvasRef.current) return;
            mouse.onMove(e, worldCanvasRef.current);
          }}
          onMouseDown={(e) => mouse.onPress(e)} // window.addEventListener('mouseup', () => mouse.onRelease());
          onMouseUp={(_) => mouse.onRelease()}
        />
      </Box>
      <Box sx={style.buttonsContainer}>
        <AdjustRules world={props.world} toggleFullscreen={toggleFullscreen} />
      </Box>
    </Box>
  );

  function getStyle() {
    return {
      background: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      canvasContainer: {
        flexGrow: 1,
        position: 'relative',
        aspectRatio: props.world.width / props.world.height,
        height: '100%',
        width: '100%',
        boxShadow: '5',
      },
      worldCanvas: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'inset 0 0 24px rgba(0, 0, 0, 0.5)',
        borderRadius: '8px',
        overflow: 'hidden',
      },
      buttonsContainer: {
        backgroundColor: 'background.paper',
        padding: '16px',
        marginTop: '32px',
        borderRadius: '16px',
        boxShadow: 5,
        flexShrink: 0,
      },
    };
  }
}
