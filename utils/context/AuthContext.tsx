import { USER_TOKEN_KEY } from '@env';
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { createContext, PropsWithChildren } from 'react';

interface AuthContextInterface {
  userToken: string | null;
  login: (userToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
  userToken: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (userToken: string | null): void => {},
  logout: (): void => {},
});

function AuthProvider({ children }: PropsWithChildren) {
  const [userToken, setUserToken] = React.useState<string | null>(null);

  const login = React.useCallback(
    async (token: string) => {
      setUserToken(token);
      await SecureStore.setItemAsync(USER_TOKEN_KEY, token);
    },
    [userToken]
  );

  const logout = React.useCallback(async () => {
    setUserToken(null);
    await SecureStore.deleteItemAsync(USER_TOKEN_KEY);
  }, [userToken]);

  const isLoggedIn = async () => {
    const currentToken = await SecureStore.getItemAsync(USER_TOKEN_KEY);
    setUserToken(currentToken);
  };

  React.useEffect(() => {
    isLoggedIn();
  }, []);

  const authValue = React.useMemo(
    () => ({
      userToken,
      login,
      logout,
    }),
    [userToken, setUserToken]
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };