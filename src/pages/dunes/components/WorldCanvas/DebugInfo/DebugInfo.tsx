import { Box } from '@mui/material';
import { useRules } from '../../../contexts/Rules';

export function DebugInfo(props: { lines: string[] }) {
  const rules = useRules();

  const style = getStyle();
  if (!rules.isDebugMode) return <></>;
  return <Box sx={style.textbox}>{props.lines.join('\n')}</Box>;

  function getStyle() {
    return {
      textbox: {
        position: 'absolute',
        top: 18,
        left: 18,
        font: '14px monospace',
        whiteSpace: 'pre',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '8px',
        padding: '8px 12px 8px 12px',
      },
    };
  }
}
