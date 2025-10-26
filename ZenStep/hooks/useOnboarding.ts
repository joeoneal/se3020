import { useState } from 'react';
import { Keyboard } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'hasOnboarded';
const STEP_GOAL_KEY = 'userStepGoal';

export default function useOnboarding() {
  const [stepGoal, setStepGoal] = useState(10000);

  const handleStart = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(STEP_GOAL_KEY, stepGoal.toString());
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      router.replace('/(tabs)/home');
    } catch (e) {
      console.error("Failed to save onboarding status", e);
    }
  };

  const handleIncrease = () => {
    setStepGoal(currentGoal => currentGoal + 500);
    Keyboard.dismiss(); // Dismiss keyboard if open
  };

  const handleDecrease = () => {
    setStepGoal(currentGoal => Math.max(0, currentGoal - 500));
    Keyboard.dismiss(); // Dismiss keyboard if open
  };

  const handleTextChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric chars
    const newGoal = parseInt(numericText, 10);
    // Update state, defaulting to 0 if input is invalid or empty
    setStepGoal(isNaN(newGoal) ? 0 : newGoal);
  };

  return {
    stepGoal,
    handleStart,
    handleIncrease,
    handleDecrease,
    handleTextChange,
  };
}