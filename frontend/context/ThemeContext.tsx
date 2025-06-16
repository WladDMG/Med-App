// context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import {
  ThemeProvider as NavigationThemeProvider,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must be used inside ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('theme').then(saved => {
      if (saved === 'dark') setIsDark(true);
    });
  }, []);

  const toggleTheme = async () => {
    const novo = !isDark;
    setIsDark(novo);
    await AsyncStorage.setItem('theme', novo ? 'dark' : 'light');
  };

  const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const navigationTheme: NavigationTheme = {
    ...(isDark ? NavigationDarkTheme : NavigationDefaultTheme),
    colors: {
      ...(isDark ? NavigationDarkTheme.colors : NavigationDefaultTheme.colors),
      background: paperTheme.colors.background,
      primary: paperTheme.colors.primary,
      card: paperTheme.colors.surface,
      text: paperTheme.colors.onSurface,
      border: paperTheme.colors.outline,
      notification: paperTheme.colors.error,
    },
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <NavigationThemeProvider value={navigationTheme}>
        <PaperProvider theme={paperTheme}>
          {children}
        </PaperProvider>
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
};
