import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

type StepProgressCircleProps = {
  steps: number;
  goal: number;
  isDarkMode: boolean;
};

export default function StepProgressCircle({ steps, goal, isDarkMode }: StepProgressCircleProps) {
  const progress = goal > 0 ? steps / goal : 0;
  // Adjusted size to match original styles
  const circleSize = width * 0.65;
  const strokeWidth = 25;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.min(progress, 1));

  const stepsTextStyle = [styles.currentStepsText, isDarkMode && styles.darkText];
  const mutedTextStyle = [styles.stepsLabel, isDarkMode && styles.darkMutedText];

  return (
    <View style={[styles.progressCircleContainer, { width: circleSize, height: circleSize }]}>
      <Svg height={circleSize} width={circleSize} viewBox={`0 0 ${circleSize} ${circleSize}`}>
        <Circle
          stroke={isDarkMode ? "#333" : "#e6e6e6"}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={circleSize / 2}
          cy={circleSize / 2}
        />
        <Circle
          stroke="#0db6db"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={circleSize / 2}
          cy={circleSize / 2}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
        />
      </Svg>
      <View style={styles.stepsTextOverlay}>
        <Text style={stepsTextStyle}>{steps.toLocaleString()}</Text>
        <Text style={mutedTextStyle}>steps</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressCircleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 20,
  },
  stepsTextOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentStepsText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333',
  },
  stepsLabel: {
    fontSize: 16,
    color: '#555',
  },
  darkText: {
    color: '#fff',
  },
  darkMutedText: {
    color: '#999',
  },
});