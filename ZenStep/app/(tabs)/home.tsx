import React from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import useHomeData, { Mood } from '../../hooks/useHomeData'; // Adjusted path
import GoalDisplay from '../../components/home/GoalDisplay'; // Adjusted path
import StepProgressCircle from '../../components/home/StepProgressCircle'; // Adjusted path
import MoodSelector from '../../components/home/MoodSelector'; // Adjusted path

export default function HomeScreen() {
  const {
    dailyStepGoal,
    currentSteps,
    selectedMood,
    isLoading,
    handleMoodSelect,
  } = useHomeData();

  const { contextTheme } = useTheme();
  const isDarkMode = contextTheme === 'dark';

  const containerStyle = [styles.container, isDarkMode && styles.darkContainer];

  if (isLoading) {
    return (
      <View style={[containerStyle, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0db6db" />
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <GoalDisplay
          goal={dailyStepGoal}
          isDarkMode={isDarkMode}
        />
        <StepProgressCircle
          steps={currentSteps}
          goal={dailyStepGoal}
          isDarkMode={isDarkMode}
        />
        <MoodSelector
          selectedMood={selectedMood}
          onSelectMood={handleMoodSelect}
          isDarkMode={isDarkMode}
        />
      </ScrollView>
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'space-around', // Keeps spacing similar
  },
});