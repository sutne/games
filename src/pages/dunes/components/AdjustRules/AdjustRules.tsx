import {
  Brush,
  BugReport,
  CleaningServices,
  Fullscreen,
  FullscreenExit,
  Mouse,
  Pause,
  PlayArrow,
  RestartAlt,
} from '@mui/icons-material';
import { Stack, useMediaQuery } from '@mui/material';
import { useCallback, useState } from 'react';
import { Button } from '../../../../components/interactive';
import { useTheme } from '../../../../components/providers';
import { useRules } from '../../contexts/Rules';
import type { World } from '../../logic/World';

/** a basic canvas application where each pixel represents a pice of sand */
export function AdjustRules(props: {
  world: World;
  toggleFullscreen: () => void;
}) {
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const rules = useRules();

  function togglePause() {
    rules.setIsPaused((prev) => !prev);
    forceUpdate();
  }

  function toggleRightClickAction() {
    rules.setRightClickAction((prev) => (prev === 'erase' ? 'solid' : 'erase'));
  }

  function swapCursorSize() {
    rules.setCursorSize((prev) => (prev + 4) % 16);
  }

  function toggleDebugMode() {
    rules.setIsDebugMode((prev) => !prev);
  }

  function clearSand() {
    props.world.clearSand();
    forceUpdate();
  }

  function reset() {
    props.world.clear();
    forceUpdate();
  }

  const isPhone = useMediaQuery(useTheme().theme.breakpoints.down('sm'));
  if (!isPhone) {
    return (
      <Stack direction='column' gap='8px'>
        <Stack direction='row' gap='8px'>
          <Button
            icon={rules.isPaused ? <PlayArrow /> : <Pause />}
            label={rules.isPaused ? 'Play' : 'Pause'}
            onClick={togglePause}
          />
          <Button
            icon={<Brush />}
            label={`Brush size: ${rules.cursorSize}`}
            onClick={swapCursorSize}
          />
          <Button
            icon={<Mouse />}
            label={`right: ${rules.rightClickAction}`}
            onClick={toggleRightClickAction}
          />
        </Stack>
        <Stack direction='row' gap='8px'>
          <Button
            icon={<BugReport />}
            label={`debug mode: ${rules.isDebugMode}`}
            onClick={toggleDebugMode}
          />
          <Button
            icon={rules.isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            label={`${rules.isFullscreen ? 'Exit' : 'Enter'} Fullscreen`}
            onClick={props.toggleFullscreen}
          />
          <Button
            icon={<CleaningServices />}
            label='clear sand'
            onClick={clearSand}
          />
          <Button icon={<RestartAlt />} label='reset' onClick={reset} />
        </Stack>
      </Stack>
    );
  }
  return (
    <Stack direction='column' gap='8px'>
      <Stack direction='row' gap='8px'>
        <Button
          icon={rules.isPaused ? <PlayArrow /> : <Pause />}
          label={rules.isPaused ? 'Play' : 'Pause'}
          onClick={togglePause}
        />
        <Button
          icon={<Brush />}
          label={`Brush size: ${rules.cursorSize}`}
          onClick={swapCursorSize}
        />
      </Stack>
      <Stack direction='row' gap='8px'>
        <Button
          icon={<BugReport />}
          label={`debug mode: ${rules.isDebugMode}`}
          onClick={toggleDebugMode}
        />
        <Button icon={<RestartAlt />} label='reset' onClick={reset} />
      </Stack>
    </Stack>
  );
}
