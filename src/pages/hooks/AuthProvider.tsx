import React, { useEffect, useState } from "react";

import { getUser, onAuthChanged, User } from "services/firebase/auth";

type props = {
  children: JSX.Element;
};
const AuthContext = React.createContext<{ user: User } | undefined>(undefined);
export function AuthProvider({ children }: props) {
  const [user, setUser] = useState(getUser());
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isListening) return;
    onAuthChanged((currUser) => {
      setUser(currUser);
    });
    setIsListening(true);
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return { ...context };
}
