import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';

type StepGoalSelectorProps = {
  stepGoal: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChangeText: (text: string) => void;
  isDarkMode: boolean;
  inputAccessoryViewID: string;
};

export default function StepGoalSelector({
  stepGoal,
  onIncrease,
  onDecrease,
  onChangeText,
  isDarkMode,
  inputAccessoryViewID,
}: StepGoalSelectorProps) {
  const labelStyle = [styles.label, isDarkMode && styles.darkText];
  const stepInputStyle = [styles.stepInput, isDarkMode && styles.darkStepInput];
  const stepButtonStyle = [styles.stepButton, isDarkMode && styles.darkStepButton];
  const stepButtonTextStyle = [styles.stepButtonText, isDarkMode && styles.darkStepButtonText];

  return (
    <View style={styles.section}>
      <Text style={labelStyle}>Daily Goal</Text>
      <View style={styles.stepContainer}>
        <TouchableOpacity style={stepButtonStyle} onPress={onDecrease}>
          <Text style={stepButtonTextStyle}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={stepInputStyle}
          value={stepGoal.toString()}
          onChangeText={onChangeText}
          keyboardType="number-pad"
          selectTextOnFocus
          placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
          inputAccessoryViewID={Platform.OS === 'ios' ? inputAccessoryViewID : undefined}
        />
        <TouchableOpacity style={stepButtonStyle} onPress={onIncrease}>
          <Text style={stepButtonTextStyle}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepButton: {
    backgroundColor: '#f0f0f0',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  darkStepButton: {
    backgroundColor: '#333',
  },
  stepButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0db6db',
    lineHeight: 30,
  },
  darkStepButtonText: {
    color: '#fff',
  },
  stepInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 130,
    backgroundColor: '#fff',
    color: '#000',
  },
  darkStepInput: {
    backgroundColor: '#333',
    borderColor: '#555',
    color: '#fff',
  },
  darkText: {
    color: '#fff',
  },
});