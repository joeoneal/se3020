import { useState, useEffect, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pedometer } from 'expo-sensors';

// Constants (copied from HomeScreen)
const STEP_GOAL_KEY = 'userStepGoal';
const LAST_OPEN_KEY = 'lastAppOpenDate';
const HISTORY_KEY = 'history';

// Types (copied from HomeScreen)
export type Mood = 'happy' | 'neutral' | 'sad';
export type HistoryItem = {
  date: string;
  steps: number;
  mood: Mood;
  goal: number;
};

// Fake Data Generator (copied from HomeScreen)
const generateFakeData = (): HistoryItem[] => {
  const fakeHistory: HistoryItem[] = [];
  const moods: Mood[] = ['happy', 'neutral', 'sad'];
  const today = new Date();
  const defaultGoal = 10000;

  for (let i = 1; i <= 10; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const dateString = day.toISOString().split('T')[0];
    const steps = Math.floor(Math.random() * 12000) + 3000;
    const mood = moods[Math.floor(Math.random() * moods.length)];
    fakeHistory.push({ date: dateString, steps, mood, goal: defaultGoal });
  }
  return fakeHistory;
};

// The Custom Hook
export default function useHomeData() {
  const [dailyStepGoal, setDailyStepGoal] = useState(10000);
  const [currentSteps, setCurrentSteps] = useState(0);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Data Handling Logic (moved from HomeScreen) ---

  const commitDayToHistory = async (dateToSave: string, goalForThatDay: number) => {
    try {
      const moodKey = `mood_${dateToSave}`;
      const stepKey = `steps_${dateToSave}`;
      const mood = await AsyncStorage.getItem(moodKey);
      const steps = await AsyncStorage.getItem(stepKey);

      if (mood && steps) {
        const historyItem: HistoryItem = {
          date: dateToSave,
          steps: parseInt(steps, 10),
          mood: mood as Mood,
          goal: goalForThatDay,
        };
        const historyString = await AsyncStorage.getItem(HISTORY_KEY);
        const history = historyString ? JSON.parse(historyString) : [];
        if (!history.find((item: any) => item.date === dateToSave)) {
          history.push(historyItem);
          await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        }
      }
      // Clean up temporary keys
      await AsyncStorage.removeItem(moodKey);
      await AsyncStorage.removeItem(stepKey);
    } catch (e) {
      console.error("Failed to commit history", e);
    }
  };

  const loadCurrentDayData = async (today: string) => {
    try {
      const savedGoal = await AsyncStorage.getItem(STEP_GOAL_KEY);
      if (savedGoal) setDailyStepGoal(parseInt(savedGoal, 10));

      const moodKey = `mood_${today}`;
      const savedMood = await AsyncStorage.getItem(moodKey);
      if (savedMood) setSelectedMood(savedMood as Mood);
      else setSelectedMood(null); // Reset if no mood saved for today

    } catch (e) {
      console.error("Failed to load current day data", e);
    }
  };

  const getSteps = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    if (!isAvailable) {
      // Consider showing a non-blocking message or disabling step display
      console.warn("Pedometer not available");
      setCurrentSteps(0); // Default to 0 if unavailable
      return;
    }

    const { status } = await Pedometer.requestPermissionsAsync();
    if (status !== 'granted') {
       // Consider showing a non-blocking message
      console.warn("Pedometer permission not granted");
      setCurrentSteps(0); // Default to 0 if no permission
      return;
    }

    const end = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    try {
      const result = await Pedometer.getStepCountAsync(start, end);
      if (result) {
        setCurrentSteps(result.steps);
      } else {
        setCurrentSteps(0);
      }
    } catch (error) {
      console.error("Failed to get step count", error);
      setCurrentSteps(0);
    }
  };

  // Main effect hook (using useFocusEffect)
  useFocusEffect(
    useCallback(() => {
      const runDailyCheck = async () => {
        setIsLoading(true);
        try {
          const today = new Date().toISOString().split('T')[0];
          const lastOpenDate = await AsyncStorage.getItem(LAST_OPEN_KEY);
          const historyString = await AsyncStorage.getItem(HISTORY_KEY);

          // Inject fake data if needed
          if (historyString === null) {
            console.log("No history found, injecting fake data...");
            const fakeData = generateFakeData();
            await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(fakeData));
          }
          // Commit previous day if new day started
          else if (lastOpenDate && lastOpenDate < today) {
            await commitDayToHistory(lastOpenDate, dailyStepGoal);
          }

          // Load current day's saved data (goal, mood)
          await loadCurrentDayData(today);
          // Get live step count
          await getSteps();

          // Update last open date
          await AsyncStorage.setItem(LAST_OPEN_KEY, today);

        } catch (e) {
          console.error("Failed to run daily check", e);
        } finally {
          setIsLoading(false);
        }
      };

      runDailyCheck();
      // Optional: Add cleanup logic if needed when screen loses focus
      // return () => { console.log("Screen lost focus"); };
    }, [dailyStepGoal]) // Dependency: Re-run if goal changes
                      // Note: We deliberately don't depend on steps/mood
                      // as they change frequently and are fetched live.
  );

  // Mood Selection Handler
  const handleMoodSelect = async (mood: Mood) => {
    const today = new Date().toISOString().split('T')[0];
    const moodKey = `mood_${today}`;
    const stepKey = `steps_${today}`;

    // Optimistically update UI
    setSelectedMood(mood);

    try {
      await AsyncStorage.setItem(moodKey, mood);
      // Save the *current* steps from the state when mood is logged
      await AsyncStorage.setItem(stepKey, currentSteps.toString());

      Alert.alert("Mood Logged", `You logged: ${mood.charAt(0).toUpperCase() + mood.slice(1)}`);
    } catch (e) {
      console.error("Failed to save mood", e);
      // Optionally revert UI update or show error
      Alert.alert("Error", "Failed to save mood.");
      setSelectedMood(null); // Example: Revert selection on error
    }
  };

  // Return values needed by the HomeScreen component
  return {
    dailyStepGoal,
    currentSteps,
    selectedMood,
    isLoading,
    handleMoodSelect,
  };
}