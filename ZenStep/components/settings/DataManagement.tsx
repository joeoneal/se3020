import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type DataManagementSectionProps = {
  onClearHistory: () => void;
  isDarkMode: boolean;
};

export default function DataManagementSection({ onClearHistory, isDarkMode }: DataManagementSectionProps) {
  const labelStyle = [styles.label, isDarkMode && styles.darkText];

  return (
    <View style={styles.section}>
      <Text style={labelStyle}>Data Management</Text>
      <Button
        title="Clear All History"
        onPress={onClearHistory}
        color="#d32f2f"
      />
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
  darkText: {
    color: '#fff',
  },
});