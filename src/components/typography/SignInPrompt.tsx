import React from "react";
import { Typography } from "@mui/material";

import { Link } from "components/interactive";

type props = {
  pre?: string;
  post?: string;
};
export function SignInPrompt({ pre, post }: props) {
  return (
    <>
      {pre ? <Typography key="pre">{pre}</Typography> : <></>}
      <Typography key="prompt">
        <Link onClick={() => console.log("temp")}>Sign in</Link> or{" "}
        <Link onClick={() => console.log("temp")}>create a user</Link>
      </Typography>
      {post ? <Typography key="post">{post}</Typography> : <></>}
    </>
  );
}
