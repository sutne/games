import { Box } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useTheme } from '../../../../components/providers';
import { useRules } from '../../contexts/Rules';
import './WorldCanvas.css';
import { useMouse } from '../../contexts/Mouse';
import { useWorld } from '../../contexts/World';
import { useAnimationFrame } from '../../hooks/useAnimationFrame';
import { Air } from '../../logic/elements/Air';
import type { PixelPainter } from '../../logic/renderers/PixelPainter';
import { Canvas } from './Canvas/Canvas';
import { DebugInfo } from './DebugInfo/DebugInfo';
import { InteractionCanvas } from './InteractionCanvas/InteractionCanvas';

export function WorldCanvas() {
  const rules = useRules();
  const mouse = useMouse();
  const world = useWorld();

  const painterRef = useRef<PixelPainter>(null);
  const [debugText, setDebugText] = useState<string[]>([]);

  const runRenderCycle = (elapsedSeconds: number) => {
    const painter = painterRef.current;
    if (!painter) return;

    world.handleMouseInteraction(
      mouse.previousInteractionPosition,
      mouse.position,
      mouse.button,
      rules.cursorSize,
      rules.rightClickAction,
    );
    mouse.previousInteractionPosition = mouse.position;

    const startUpdate = performance.now();
    if (!rules.isPaused) {
      world.update(elapsedSeconds);
    }
    const endUpdate = performance.now();
    const updateMS = endUpdate - startUpdate;

    const startDraw = performance.now();
    world.draw(painter, rules.isDebugMode);
    const endDraw = performance.now();
    const drawMS = endDraw - startDraw;

    if (rules.isDebugMode) {
      const lines = [
        `FPS: \t${(1 / elapsedSeconds).toFixed(0)} (${(1 / (Math.max(1, drawMS + updateMS) / 1000)).toFixed(0)})`,
        `draw: \t${(drawMS).toFixed(0)}ms`,
        `update:\t${(updateMS).toFixed(0)}ms`,
      ];
      if (world.isInside(mouse.position)) {
        const e = world.get(mouse.position);
        lines.push(
          `mouse(x=${mouse.position.int_x},y=${mouse.position.int_y}): ${e.constructor.name}`,
        );
        if (rules.isPaused && !(e instanceof Air)) {
          lines.push(
            `\tPos(x=${e.position.x.toFixed(3)},y=${e.position.y.toFixed(3)})`,
          );
          lines.push(
            `\tVelocity(dx=${e.velocity.dx.toFixed(3)},dy=${e.velocity.dy.toFixed(3)})`,
          );
        }
      }
      setDebugText(lines);
    }
  };
  useAnimationFrame(runRenderCycle);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (rules.isPaused && rules.isDebugMode) {
        if (key === 'ArrowRight') {
          world.update(0.001);
        }
      }
    },
    [world, rules.isPaused, rules.isDebugMode],
  );

  const { theme } = useTheme();
  const style = getStyle();
  return (
    <Box sx={style.canvasContainer}>
      <Canvas
        width={world.width}
        height={world.height}
        painterRef={painterRef}
      />
      <DebugInfo lines={debugText} />
      <InteractionCanvas
        width={world.width}
        height={world.height}
        onKeyPress={handleKeyPress}
      />
    </Box>
  );
  function getStyle() {
    return {
      canvasContainer: {
        flexGrow: 1,
        position: 'relative',
        aspectRatio: world.width / world.height,
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'inset 0 0 24px rgba(0, 0, 0, 0.5)',
        borderRadius: '8px',
        overflow: 'hidden',
      },
    };
  }
}
