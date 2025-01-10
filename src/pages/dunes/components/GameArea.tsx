import { Box } from '@mui/material';
import { useTheme } from '../../../components/providers';
import { useRules } from '../contexts/Rules';
import { AdjustRules } from './AdjustRules/AdjustRules';
import { WorldCanvas } from './WorldCanvas/WorldCanvas';

export function GameArea() {
  const { theme } = useTheme();
  const rules = useRules();

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

  const style = getStyle();
  return (
    <Box id='dunes' sx={style.background}>
      <WorldCanvas />
      <Box sx={style.buttonsContainer}>
        <AdjustRules toggleFullscreen={toggleFullscreen} />
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
