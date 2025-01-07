import { Stack, useMediaQuery } from '@mui/material';
import { PageHeader } from 'components/typography';
import { useTheme } from '../../components/providers';
import { Canvas } from './components/WorldCanvas/Canvas/Canvas';
import { MouseProvider } from './contexts/Mouse';
import { RulesProvider } from './contexts/Rules';
import { WorldProvider } from './contexts/World';

/** a basic canvas application where each pixel represents a pice of sand */
export function Dunes() {
  const isPhone = useMediaQuery(useTheme().theme.breakpoints.down('sm'));
  const width = isPhone ? 256 : 512;
  const height = isPhone ? 256 : 256;

  return (
    <Stack direction='column' style={{ flexGrow: 1 }}>
      <PageHeader header='Dunes' />
      <WorldProvider width={width} height={height}>
        <RulesProvider>
          <MouseProvider>
            <Canvas />
          </MouseProvider>
        </RulesProvider>
      </WorldProvider>
    </Stack>
  );
}
