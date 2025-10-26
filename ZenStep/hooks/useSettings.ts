import { useState, useEffect } from 'react';
import { Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STEP_GOAL_KEY = 'userStepGoal';
const HISTORY_KEY = 'history';

export default function useSettings() {
  const [stepGoal, setStepGoal] = useState(10000);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedGoal = await AsyncStorage.getItem(STEP_GOAL_KEY);
        if (savedGoal) {
          setStepGoal(parseInt(savedGoal, 10));
        }
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const saveGoal = async () => {
      try {
        await AsyncStorage.setItem(STEP_GOAL_KEY, stepGoal.toString());
      } catch (e) {
        console.error("Failed to save step goal", e);
      }
    };

    const timerId = setTimeout(() => {
      saveGoal();
    }, 500);

    return () => clearTimeout(timerId);
  }, [stepGoal]);

  const handleIncrease = () => {
    setStepGoal(currentGoal => currentGoal + 500);
    Keyboard.dismiss();
  };

  const handleDecrease = () => {
    setStepGoal(currentGoal => Math.max(0, currentGoal - 500));
    Keyboard.dismiss();
  };

  const handleTextChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const newGoal = parseInt(numericText, 10);
    setStepGoal(isNaN(newGoal) ? 0 : newGoal);
  };

  const handleClearHistory = () => {
    Alert.alert(
      "Clear All History",
      "Are you sure? This action cannot be undone and will permanently delete all step and mood history.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(HISTORY_KEY);
              Alert.alert("Success", "Your history has been cleared.");
            } catch (e) {
              console.error("Failed to clear history", e);
              Alert.alert("Error", "Could not clear history.");
            }
          },
        },
      ]
    );
  };

  return {
    stepGoal,
    handleIncrease,
    handleDecrease,
    handleTextChange,
    handleClearHistory,
  };
}