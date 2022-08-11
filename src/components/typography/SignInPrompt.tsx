import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { Link } from "components/interactive";

type props = {
  pre?: string;
  post?: string;
};
export function SignInPrompt({ pre, post }: props) {
  const navigate = useNavigate();

  return (
    <>
      {pre ? <Typography key="pre">{pre}</Typography> : <></>}
      <Box key="prompt">
        <Link onClick={() => navigate("/profile/sign-in")}>Sign in</Link> or{" "}
        <Link onClick={() => navigate("/profile/create-user")}>
          create a user
        </Link>
      </Box>
      {post ? <Typography key="post">{post}</Typography> : <></>}
    </>
  );
}
