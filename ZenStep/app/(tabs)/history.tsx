import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'; // For mood icons

type HistoryItem = {
  date: string;
  steps: number;
  mood: 'happy' | 'neutral' | 'sad';
};

const HISTORY_KEY = 'history'; 

const MoodIcon = ({ mood }: { mood: HistoryItem['mood'] }) => {
  const iconName = mood === 'happy' ? 'smile' : mood === 'neutral' ? 'meh' : 'frown';
  const color = mood === 'happy' ? '#2e7d32' : mood === 'neutral' ? '#fbc02d' : '#d32f2f';
  return <Feather name={iconName} size={24} color={color} />;
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

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemDate}>{new Date(item.date).toDateString()}</Text>
        <Text style={styles.itemSteps}>{item.steps.toLocaleString()} steps</Text>
      </View>
      <MoodIcon mood={item.mood} />
    </View>
  );

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
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
  },
  itemDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSteps: {
    fontSize: 14,
    color: '#0db6db',
    marginTop: 5,
  },
});