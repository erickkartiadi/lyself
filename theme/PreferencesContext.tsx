import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { ThemeMode, useThemeMode } from '@rneui/themed';

const PreferencesContext = createContext({
  theme: 'light',
  setPreferences: (mode: ThemeMode): void => {},
});

function PreferencesProvider({
  children,
}: PropsWithChildren<{ children: ReactNode }>) {
  const [theme, setTheme] = useState('light');

  const { setMode } = useThemeMode();

  const setPreferences = useCallback(
    (mode: ThemeMode) => {
      setTheme(mode);
      setMode(mode);
    },
    [theme]
  );

  const preferences = useMemo(
    () => ({
      theme,
      setPreferences,
    }),
    [theme, setTheme]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
}
export { PreferencesContext, PreferencesProvider };
