import { Stack } from '@mui/material';
import { PageHeader } from 'components/typography';
import { useRef } from 'react';
import { Canvas } from './components/Canvas/Canvas';
import { RulesProvider } from './contexts/Rules';
import { Mouse } from './logic/Mouse';
import { World } from './logic/World';

/** a basic canvas application where each pixel represents a pice of sand */
export function Dunes() {
  const mouse = useRef(new Mouse());
  const world = useRef(new World(512, 256));

  return (
    <Stack direction='column' style={{ flexGrow: 1 }}>
      <PageHeader header='Dunes' />
      <RulesProvider>
        <Canvas world={world.current} mouse={mouse.current} />
      </RulesProvider>
    </Stack>
  );
}
