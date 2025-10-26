import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle, StyleProp } from 'react-native'; // Import style types

type Theme = 'light' | 'dark';

type ThemeSelectorProps = {
  selectedTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
  isDarkMode: boolean;
};

export default function ThemeSelector({ selectedTheme, onSelectTheme, isDarkMode }: ThemeSelectorProps) {
  const labelStyle = [styles.label, isDarkMode && styles.darkText];

  const getThemeButtonStyle = (theme: Theme): StyleProp<ViewStyle> => {
    const baseStyle: ViewStyle[] = [styles.themeButton]; 

    if (isDarkMode && selectedTheme !== theme) {
        baseStyle.push(styles.darkThemeButton);
    }
    if (selectedTheme === theme) {
      baseStyle.push(styles.themeButtonSelected);
    }
    return baseStyle;
  };

  // Add explicit return type StyleProp<TextStyle>
  const getThemeButtonTextStyle = (theme: Theme): StyleProp<TextStyle> => {
    const baseStyle: TextStyle[] = [styles.themeButtonText]; 

    if (isDarkMode && selectedTheme !== theme) {
       baseStyle.push(styles.darkThemeButtonTextUnselected);
    }
    if (selectedTheme === theme) {
      baseStyle.push(styles.themeButtonTextSelected);
    }
    return baseStyle;
  };


  return (
    <View style={styles.section}>
      <Text style={labelStyle}>Theme</Text>
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

// Styles remain the same
const styles = StyleSheet.create({
    section: {
        marginBottom: 40,
    },
    label: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    themeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    themeButton: {
        borderWidth: 1.5,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
        paddingVertical: 12,
        paddingHorizontal: 35,
        borderRadius: 25,
        marginRight: 15,
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
    darkThemeButtonTextUnselected: {
        color: '#999',
    },
    themeButtonTextSelected: {
        color: '#fff',
    },
    darkText: {
        color: '#fff',
    },
});