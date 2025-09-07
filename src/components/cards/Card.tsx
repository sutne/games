import { Box } from '@mui/material';

type props = {
  children: React.ReactNode;
  color?: string;
  type?: 'elevated' | 'bordered' | 'invisible';
  padding?: string;
};
export function Card({ type = 'elevated', ...props }: props) {
  const classes = getClasses();
  return <Box sx={classes.card}>{props.children}</Box>;

  function getClasses() {
    return {
      card: [
        {
          // height: "100%",
          width: '100%',
          backgroundColor: props.color ?? 'background.paper',
          borderRadius: '16px',
          padding: props.padding ?? '32px',
        },
        type === 'elevated' && {
          boxShadow: 5,
        },
        type === 'bordered' && {
          borderColor: 'divider',
          borderStyle: 'solid',
          borderWidth: '1pt',
        },
        type === 'invisible' && {},
      ],
    };
  }
}
