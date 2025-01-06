import { Stack } from '@mui/material';
import { PageHeader } from 'components/typography';
import { useRef } from 'react';
import { Canvas } from './components/WorldCanvas/Canvas/Canvas';
import { MouseProvider } from './contexts/Mouse';
import { RulesProvider } from './contexts/Rules';
import { World } from './logic/World';

/** a basic canvas application where each pixel represents a pice of sand */
export function Dunes() {
  const world = useRef(new World(512, 256));

  return (
    <Stack direction='column' style={{ flexGrow: 1 }}>
      <PageHeader header='Dunes' />
      <RulesProvider>
        <MouseProvider>
          <Canvas world={world.current} />
        </MouseProvider>
      </RulesProvider>
    </Stack>
  );
}
