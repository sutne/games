import { CircularProgress } from '@mui/material';
import { useTheme } from 'components/providers/ThemeProvider';
import { useState } from 'react';
import { Button } from '.';

type props = {
  label: string;
  onClick: () => void;
  loadingLabel?: string;
  color?:
    | 'error'
    | 'primary'
    | 'inherit'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | undefined;
};
export function LoadingButton({ color, onClick, label, loadingLabel }: props) {
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };

  return (
    <Button
      label={loading ? (loadingLabel ?? label) : label}
      color={color}
      onClick={handleClick}
      icon={
        loading ? (
          <CircularProgress
            size={theme.typography.htmlFontSize}
            color={color}
          />
        ) : (
          <></>
        )
      }
    />
  );
}
