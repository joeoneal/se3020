import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Theme = 'light' | 'dark';

type ThemeSelectorProps = {
  selectedTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
  isDarkMode: boolean;
};

export default function ThemeSelector({ selectedTheme, onSelectTheme, isDarkMode }: ThemeSelectorProps) {
  const labelStyle = [styles.label, isDarkMode && styles.darkText];

  const getThemeButtonStyle = (theme: Theme) => {
    const baseStyle = [styles.themeButton, isDarkMode && styles.darkThemeButton];
    if (selectedTheme === theme) {
      baseStyle.push(styles.themeButtonSelected);
    }
    return baseStyle;
  };

  const getThemeButtonTextStyle = (theme: Theme) => {
    const baseStyle = [styles.themeButtonText, isDarkMode && styles.darkThemeButtonText];
    if (selectedTheme === theme) {
      baseStyle.push(styles.themeButtonTextSelected);
    }
    return baseStyle;
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={labelStyle}>Theme:</Text>
      <View style={styles.themeContainer}>
        <TouchableOpacity
          style={getThemeButtonStyle('light')}
          onPress={() => onSelectTheme('light')}
        >
          <Text style={getThemeButtonTextStyle('light')}>Light</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getThemeButtonStyle('dark')}
          onPress={() => onSelectTheme('dark')}
        >
          <Text style={getThemeButtonTextStyle('dark')}>Dark</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
  },
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%', 
  },
  themeButton: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    paddingVertical: 12,
    paddingHorizontal: 35, 
    borderRadius: 25,
    marginHorizontal: 10, 
  },
  darkThemeButton: {
    backgroundColor: '#333',
    borderColor: '#555',
  },
  themeButtonSelected: {
    backgroundColor: '#0db6db',
    borderColor: '#0db6db',
  },
  themeButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  darkThemeButtonText: {
    color: '#999',
  },
  themeButtonTextSelected: {
    color: '#fff',
  },
  darkText: {
    color: '#fff',
  },
});