import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';
const THEME_KEY = 'appTheme';

type ThemeContextType = {
  contextTheme: Theme;
  changeTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  contextTheme: 'light', // Default
  changeTheme: () => { console.log('change theme not implemented'); }
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme(); // Gets 'light', 'dark', or 'null' from device
  const [contextTheme, setContextTheme] = useState<Theme>('light'); // Default

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme) {
          setContextTheme(savedTheme as Theme);
        } else {
          setContextTheme(colorScheme || 'light');
        }
      } catch (e) {
        console.error("Failed to load theme", e);
        setContextTheme(colorScheme || 'light');
      }
    };
    loadTheme();
  }, [colorScheme]); 

  const changeTheme = async (theme: Theme) => {
    try {
      setContextTheme(theme);
      await AsyncStorage.setItem(THEME_KEY, theme);
      console.log("Theme changed and saved:", theme);
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  }

  return (
    <ThemeContext.Provider value={{ contextTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme, ThemeContext };