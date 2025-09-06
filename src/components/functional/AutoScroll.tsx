import { Box } from '@mui/material';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';

type props = {
  children: JSX.Element | string;
};

/** Automatically scrolls to its content on render */
export function AutoScroll({ children }: props) {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [scrollRef]);

  return (
    <Box sx={{ width: '100%' }} ref={scrollRef}>
      {children}
    </Box>
  );
}
