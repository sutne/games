import { Stack } from '@mui/material';
import { PageHeader } from 'components/typography';
import { useTheme } from '../../components/providers';
import { GameArea } from './components/GameArea';
import { MouseProvider } from './contexts/Mouse';
import { RulesProvider } from './contexts/Rules';
import { WorldProvider } from './contexts/World';

/** a basic canvas application where each pixel represents a pice of sand */
export function Dunes() {
  const { isPhone } = useTheme();
  const isDebug = false;
  const width = isDebug ? 128 : isPhone ? 256 : 512;
  const height = isDebug ? 64 : isPhone ? 256 : 256;

  return (
    <Stack direction='column' style={{ flexGrow: 1 }}>
      <PageHeader header='Dunes' />
      <WorldProvider width={width} height={height}>
        <RulesProvider>
          <MouseProvider>
            <GameArea />
          </MouseProvider>
        </RulesProvider>
      </WorldProvider>
    </Stack>
  );
}
