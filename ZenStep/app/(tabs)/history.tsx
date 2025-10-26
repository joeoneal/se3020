import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
// 1. Import your theme hook
import { useTheme } from '../../contexts/ThemeContext';

type HistoryItem = {
  date: string;
  steps: number;
  mood: 'happy' | 'neutral' | 'sad';
  goal: number;
};

const HISTORY_KEY = 'history';

// MoodIcon component (no changes needed)
const MoodIcon = ({ mood }: { mood: HistoryItem['mood'] }) => {
  const iconName = mood === 'happy' ? 'smile' : mood === 'neutral' ? 'meh' : 'frown';
  const color = mood === 'happy' ? '#2e7d32' : mood === 'neutral' ? '#fbc02d' : '#d32f2f';
  return <Feather name={iconName} size={30} color={color} />;
};

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Instantiate the theme hook
  const { contextTheme } = useTheme();
  const isDarkMode = contextTheme === 'dark';

  useFocusEffect(
    useCallback(() => {
      const loadHistory = async () => {
        setIsLoading(true);
        try {
          const historyString = await AsyncStorage.getItem(HISTORY_KEY);
          if (historyString) {
            const parsedHistory: HistoryItem[] = JSON.parse(historyString);
            setHistory(parsedHistory.reverse());
          } else {
            setHistory([]);
          }
        } catch (e) {
          console.error('Failed to load history', e);
        }
        setIsLoading(false);
      };
      loadHistory();
    }, [])
  );

  // 3. Update renderItem function to be theme-aware
  const renderItem = ({ item }: { item: HistoryItem }) => {
    const goalReached = item.steps >= item.goal;

    // Apply dynamic styles within the rendered item
    return (
      <View style={[styles.itemContainer, isDarkMode && styles.darkItemContainer]}>
        <View>
          <Text style={[styles.itemDate, isDarkMode && styles.darkText]}>
            {new Date(item.date).toDateString()}
          </Text>
          
          <Text style={[styles.itemGoal, isDarkMode && styles.darkMutedText]}>
            Goal: {item.goal.toLocaleString()} steps
          </Text>

          <View style={styles.stepRow}>
            <Text style={styles.itemSteps}>{item.steps.toLocaleString()} steps</Text>
            {goalReached && (
              <Text style={styles.goalReachedText}>Goal reached!</Text>
            )}
          </View>
        </View>
        <MoodIcon mood={item.mood} />
      </View>
    );
  };

  // 4. Apply dynamic styles to the main view and components
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0db6db" style={styles.loading} />
      ) : history.length === 0 ? (
        <Text style={[styles.emptyText, isDarkMode && styles.darkMutedText]}>
          No history yet. Start logging!
        </Text>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.date}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

// 5. Add dark mode styles to the StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  listContainer: {
    padding: 20,
  },
  loading: {
    marginTop: 50,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#555',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
  },
  darkItemContainer: {
    backgroundColor: '#222', // Darker background for list items
  },
  itemDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  darkText: {
    color: '#fff', // White text for dates
  },
  itemGoal: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginTop: 8,
  },
  darkMutedText: {
    color: '#999', // Lighter gray for muted text
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemSteps: {
    fontSize: 16,
    color: '#0db6db', // Keep brand color
    fontWeight: '500',
  },
  goalReachedText: {
    fontSize: 14,
    color: '#2e7d32', // Keep success color
    fontWeight: 'bold',
    marginLeft: 10,
    fontStyle: 'italic',
  },
});