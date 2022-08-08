import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";

type props = {
  children: JSX.Element | string;
};

/** Automatically scrolls to its content on render */
export function AutoScroll({ children }: props) {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, []);

  return <Box ref={scrollRef}>{children}</Box>;
}
