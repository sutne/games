import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { useAuth } from "pages/hooks/AuthProvider";

import { CreateUser } from "./CreateUser";
import { SignedIn } from "./SignedIn";
import { SignIn } from "./SignIn";

export enum UserState {
  SIGNED_IN,
  SIGN_IN,
  CREATE_USER,
}
export function Profile() {
  const [state, setState] = useState(UserState.SIGN_IN);
  const { user } = useAuth();

  useEffect(() => {
    if (user.isSignedIn) setState(UserState.SIGNED_IN);
    else setState(UserState.SIGN_IN);
  }, [user]);

  const classes = profileClasses();
  return (
    <Box sx={classes.wrapper}>
      {state === UserState.SIGNED_IN ? (
        <SignedIn />
      ) : state === UserState.SIGN_IN ? (
        <SignIn switchState={setState} />
      ) : (
        <CreateUser switchState={setState} />
      )}
    </Box>
  );
}

export function profileClasses() {
  return {
    wrapper: {
      width: "60%",
      padding: "32px",
      margin: "0 auto",
      borderRadius: "16px",
      boxShadow: 5,
      backgroundColor: "background.paper",
    },
    header: {
      textAlign: "center",
      paddingBottom: "32px",
    },
    footer: {
      paddingTop: "32px",
      textAlign: "center",
    },
    link: {
      display: "inline-block",
      cursor: "pointer",
      color: "info.main",
      textDecoration: "underline",
      "&:hover": {
        fontWeight: "500",
      },
    },
  };
}
