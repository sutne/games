import React, { useState } from "react";

import { useAuth } from "components/providers/AuthProvider";

import { CreateUser, SignedIn, SignIn } from "./components";

export function Profile() {
  const { user } = useAuth();
  if (user.isSignedIn)
    return <SignedIn username={user.username ?? "<undefined>"} />;

  const [creatingUser, setCreatingUser] = useState(true);
  return creatingUser ? (
    <CreateUser setCreatingUser={setCreatingUser} />
  ) : (
    <SignIn setCreatingUser={setCreatingUser} />
  );
}
