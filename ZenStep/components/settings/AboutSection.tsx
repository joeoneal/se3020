import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type AboutSectionProps = {
  isDarkMode: boolean;
};

export default function AboutSection({ isDarkMode }: AboutSectionProps) {
  const labelStyle = [styles.label, isDarkMode && styles.darkText];
  const aboutContainerStyle = [styles.aboutContainer, isDarkMode && styles.darkSecondaryContainer];
  const aboutTextStyle = [styles.aboutText, isDarkMode && styles.darkText]; 
  return (
    <View style={styles.section}>
      <Text style={labelStyle}>About</Text>
      <View style={aboutContainerStyle}>
        <Text style={aboutTextStyle}>Copyright 2025</Text>
        <Text style={aboutTextStyle}>Version 1.0.0</Text>
      </View>
    </View>
  );
}

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
  aboutContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
  },
  darkSecondaryContainer: {
    backgroundColor: '#222',
  },
  aboutText: {
    fontSize: 16,
    color: '#555', 
    marginBottom: 10,
  },
  darkText: { 
    color: '#fff',
  },
});