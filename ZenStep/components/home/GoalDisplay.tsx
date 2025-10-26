import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type GoalDisplayProps = {
  goal: number;
  isDarkMode: boolean;
};

export default function GoalDisplay({ goal, isDarkMode }: GoalDisplayProps) {
  const textStyle = isDarkMode ? styles.darkText : styles.lightText;
  const goalTextStyle = [styles.goalText, isDarkMode ? styles.darkGoalText : styles.lightGoalText]; 

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.focusText, textStyle]}>Today's Focus:</Text>
      <Text style={goalTextStyle}>{goal.toLocaleString()} steps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  focusText: {
    fontSize: 26,
    fontWeight: '500',
    marginBottom: 5,
  },
  goalText: {
    fontSize: 34,
    fontWeight: '700',
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  lightGoalText: {
     color: '#0db6db', // Brand color for light mode
  },
  darkGoalText: {
     color: '#0db6db', // Keep brand color for dark mode
  }
});