import { Box, Grow } from '@mui/material';

type props = {
  children: React.ReactNode;
  trigger?: boolean;
};
export function FadeIn(props: props) {
  return (
    <Grow
      in={props.trigger ?? true}
      {...(props.trigger ? { timeout: 2000 } : {})}
      unmountOnExit
    >
      <Box>{props.children}</Box>
    </Grow>
  );
}
