import React from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, Platform, InputAccessoryView, TouchableOpacity, Text } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';
import useOnboarding from '../hooks/useOnboarding';
import OnboardingHeader from '../components/onboarding/OnboardingHeader'; 
import StepGoalSelector from '../components/onboarding/StepGoalSelector'; 
import ThemeSelector from '../components/onboarding/ThemeSelector'; 
import StartButton from '../components/onboarding/StartButton'; 

const inputAccessoryViewID = 'stepGoalInputAccessory';

export default function OnboardingScreen() {
  const {
    stepGoal,
    handleIncrease,
    handleDecrease,
    handleTextChange,
    handleStart,
  } = useOnboarding();

  const { contextTheme, changeTheme } = useTheme();
  const isDarkMode = contextTheme === 'dark';

  const containerStyle = [styles.container, isDarkMode && styles.darkContainer];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={containerStyle}>
        <Stack.Screen options={{ title: "Welcome" }} />

        <OnboardingHeader isDarkMode={isDarkMode} />

        <View style={styles.interactiveContainer}>
          <StepGoalSelector
            stepGoal={stepGoal}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onChangeText={handleTextChange}
            isDarkMode={isDarkMode}
            inputAccessoryViewID={inputAccessoryViewID}
          />

          <ThemeSelector
            selectedTheme={contextTheme}
            onSelectTheme={changeTheme}
            isDarkMode={isDarkMode}
          />

          <StartButton onPress={handleStart} />
        </View>

        {Platform.OS === 'ios' && (
          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View style={isDarkMode ? styles.accessoryDark : styles.accessoryLight}>
              <TouchableOpacity
                onPress={Keyboard.dismiss}
                style={styles.accessoryButton}
              >
                <Text style={styles.accessoryButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20, 
    paddingBottom: 0, 
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  interactiveContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    paddingBottom: 20, 
  },
  
  accessoryLight: {
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'flex-end',
    padding: 10,
  },
  accessoryDark: {
    backgroundColor: '#333',
    borderTopWidth: 1,
    borderColor: '#555',
    alignItems: 'flex-end',
    padding: 10,
  },
  accessoryButton: {
    padding: 5,
  },
  accessoryButtonText: {
    color: '#0db6db',
    fontSize: 16,
    fontWeight: 'bold',
  },
});