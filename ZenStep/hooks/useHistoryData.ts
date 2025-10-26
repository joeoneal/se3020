import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type HistoryItem = {
  date: string;
  steps: number;
  mood: 'happy' | 'neutral' | 'sad';
  goal: number;
};

const HISTORY_KEY = 'history';

export default function useHistoryData() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true; 
      const loadHistory = async () => {
        setIsLoading(true);
        try {
          const historyString = await AsyncStorage.getItem(HISTORY_KEY);
          if (isActive) { 
            if (historyString) {
              const parsedHistory: HistoryItem[] = JSON.parse(historyString);
              parsedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              setHistory(parsedHistory);
            } else {
              setHistory([]);
            }
          }
        } catch (e) {
          console.error('Failed to load history', e);
          if (isActive) {
            setHistory([]);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      };

      loadHistory();

      return () => {
        isActive = false;
      };
    }, []) 
  );

  return { history, isLoading };
}