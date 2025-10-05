import React from 'react';
import {  Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { themes, Theme } from '@/constants/Themes';

export default function SettingsScreen() {
  const { contextTheme, changeTheme } = useTheme();
  
  const activeTheme = themes[contextTheme as keyof typeof themes] || themes.White;
  
  const styles = getStyles(activeTheme);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select a Theme</Text>
      {Object.entries(themes).map(([name]) => (
        <Pressable
          key={name}
          style={styles.button}
          onPress={() => changeTheme(name)}
        >
          <Text style={styles.buttonText}>{name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.colors.card,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 10,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 18,
    textAlign: 'center',
  },
});