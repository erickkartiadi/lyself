import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { ThemeMode, useThemeMode } from '@rneui/themed';

const ThemeModeContext = createContext({
  isDarkMode: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setThemeMode: (mode: ThemeMode): void => {},
});

function ThemeModeProvider({
  children,
}: PropsWithChildren<{ children: ReactNode }>) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { setMode } = useThemeMode();

  const setThemeMode = useCallback(
    (mode: ThemeMode) => {
      setIsDarkMode(mode === 'dark');
      setMode(mode);
    },
    [isDarkMode]
  );

  const preferences = useMemo(
    () => ({
      isDarkMode,
      setThemeMode,
    }),
    [isDarkMode, setIsDarkMode]
  );

  return (
    <ThemeModeContext.Provider value={preferences}>
      {children}
    </ThemeModeContext.Provider>
  );
}
export { ThemeModeContext, ThemeModeProvider };
