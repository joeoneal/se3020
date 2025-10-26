import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

type HistoryItem = {
  date: string;
  steps: number;
  mood: 'happy' | 'neutral' | 'sad';
  goal: number;
};

const HISTORY_KEY = 'history';

const MoodIcon = ({ mood }: { mood: HistoryItem['mood'] }) => {
  const iconName = mood === 'happy' ? 'smile' : mood === 'neutral' ? 'meh' : 'frown';
  const color = mood === 'happy' ? '#2e7d32' : mood === 'neutral' ? '#fbc02d' : '#d32f2f';
  return <Feather name={iconName} size={30} color={color} />;
};

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
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

  // --- Updated renderItem function ---
  const renderItem = ({ item }: { item: HistoryItem }) => {
    const goalReached = item.steps >= item.goal;

    return (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.itemDate}>{new Date(item.date).toDateString()}</Text>
          
          {/* --- ADDED THIS LINE --- */}
          <Text style={styles.itemGoal}>Goal: {item.goal.toLocaleString()} steps</Text>

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

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : history.length === 0 ? (
        <Text style={styles.emptyText}>No history yet. Start logging!</Text>
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

// --- Updated Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    padding: 30, // <-- INCREASED padding
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
  },
  itemDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  // --- ADDED THIS STYLE ---
  itemGoal: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginTop: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemSteps: {
    fontSize: 16,
    color: '#0db6db',
    fontWeight: '500',
  },
  goalReachedText: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: 'bold',
    marginLeft: 10,
    fontStyle: 'italic',
  },
});