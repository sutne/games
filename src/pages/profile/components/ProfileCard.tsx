import React from "react";
import { Box, Stack } from "@mui/material";
import { type JSX } from "react";
import { Card } from "components/cards/Card";

type props = {
  children: JSX.Element | JSX.Element[] | string;
  header?: JSX.Element | string;
  footer?: JSX.Element | string;
};
export function ProfileCard({ children, header, footer }: props) {
  const classes = getClasses();
  return (
    <Card>
      {header ? <Box sx={classes.header}>{header}</Box> : <></>}
      <Box>
        <Stack spacing={1} sx={classes.main}>
          {children}
        </Stack>
      </Box>
      {footer ? <Box sx={classes.footer}>{footer}</Box> : <></>}
    </Card>
  );
  function getClasses() {
    return {
      header: {
        textAlign: "center",
        paddingBottom: "32px",
      },
      main: {
        maxWidth: "400px",
        margin: "0 auto",
      },
      footer: {
        paddingTop: "32px",
        textAlign: "center",
      },
    };
  }
}
