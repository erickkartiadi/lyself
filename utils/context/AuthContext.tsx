import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import * as React from 'react';
import { createContext, PropsWithChildren } from 'react';

import app from '../../services/firebase/firebase';

interface AuthContextInterface {
  user: User | undefined;
}

const auth = getAuth(app);

const AuthContext = createContext<AuthContextInterface>({
  user: undefined,
});

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = React.useState<User | undefined>();

  React.useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(undefined);
      }
    });
    return subscribed;
  }, []);

  const authValue = React.useMemo(
    () => ({
      user,
    }),
    [user]
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
