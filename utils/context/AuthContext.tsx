import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import * as React from 'react';
import { createContext, PropsWithChildren } from 'react';

import { auth } from '../../services/firebase/firebase';

interface AuthContextInterface {
  user: User | undefined;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
  user: undefined,
  logout: () => {},
});

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = React.useState<User | undefined>();

  const logout = async () => {
    setUser(undefined);
    await signOut(auth);
  };

  React.useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(undefined);
      }
    });

    return subscribed;
  }, [user]);

  const authValue = React.useMemo(
    () => ({
      user,
      logout,
    }),
    [user, logout]
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
