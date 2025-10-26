import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import useHistoryData from '../../hooks/useHistoryData';
import HistoryList from '../../components/history/HistoryList';

export default function HistoryScreen() {
  const { history, isLoading } = useHistoryData();
  const { contextTheme } = useTheme();
  const isDarkMode = contextTheme === 'dark';

  const containerStyle = [styles.container, isDarkMode && styles.darkContainer];

  return (
    <View style={containerStyle}>
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0db6db" />
        </View>
      ) : history.length === 0 ? (
        <View style={styles.centered}>
          <Text style={[styles.emptyText, isDarkMode && styles.darkMutedText]}>
            No history yet. Start logging!
          </Text>
        </View>
      ) : (
        <HistoryList history={history} isDarkMode={isDarkMode} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
  darkMutedText: {
    color: '#999',
  },
});