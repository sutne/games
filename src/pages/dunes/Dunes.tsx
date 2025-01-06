import { Stack, useMediaQuery } from '@mui/material';
import { PageHeader } from 'components/typography';
import { useRef } from 'react';
import { useTheme } from '../../components/providers';
import { Canvas } from './components/WorldCanvas/Canvas/Canvas';
import { MouseProvider } from './contexts/Mouse';
import { RulesProvider } from './contexts/Rules';
import { World } from './logic/World';

/** a basic canvas application where each pixel represents a pice of sand */
export function Dunes() {
  const isPhone = useMediaQuery(useTheme().theme.breakpoints.down('sm'));
  const world = useRef(new World(isPhone ? 256 : 512, isPhone ? 256 : 256));

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
