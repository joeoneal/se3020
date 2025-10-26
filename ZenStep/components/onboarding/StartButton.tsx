import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

type StartButtonProps = {
  onPress: () => void;
};

export default function StartButton({ onPress }: StartButtonProps) {
  return (
    <TouchableOpacity style={styles.startButton} onPress={onPress}>
      <Text style={styles.startButtonText}>Start Your Journey</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  startButton: {
    backgroundColor: '#0db6db',
    paddingVertical: 15,
    paddingHorizontal: 70, 
    borderRadius: 30,
    marginVertical: 10, 
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center', 
  },
});