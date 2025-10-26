import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Mood } from '../../hooks/useHomeData'; 

type MoodSelectorProps = {
  selectedMood: Mood | null;
  onSelectMood: (mood: Mood) => void;
  isDarkMode: boolean;
};

export default function MoodSelector({ selectedMood, onSelectMood, isDarkMode }: MoodSelectorProps) {
  const textStyle = isDarkMode ? styles.darkText : styles.lightText;
  const moodButtonUnselectedStyle = [styles.moodButton, isDarkMode && styles.darkMoodButton];

  const getMoodButtonStyle = (mood: Mood) => {
    const baseStyle = moodButtonUnselectedStyle;
    if (selectedMood !== mood) return baseStyle;
    if (mood === 'happy') return [...baseStyle, styles.moodSelectedHappy];
    if (mood === 'neutral') return [...baseStyle, styles.moodSelectedNeutral];
    if (mood === 'sad') return [...baseStyle, styles.moodSelectedSad];
    return baseStyle; // Fallback
  };

  const getMoodIconColor = (mood: Mood) => {
    if (selectedMood !== mood) return isDarkMode ? '#999' : '#555';
    if (mood === 'happy') return '#2e7d32';
    if (mood === 'neutral') return '#fbc02d';
    if (mood === 'sad') return '#d32f2f';
    return isDarkMode ? '#999' : '#555';
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.moodLabel, textStyle]}>Log your mood</Text>
      <View style={styles.moodContainer}>
        <TouchableOpacity
          style={getMoodButtonStyle('happy')}
          onPress={() => onSelectMood('happy')}
        >
          <Feather name="smile" size={44} color={getMoodIconColor('happy')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={getMoodButtonStyle('neutral')}
          onPress={() => onSelectMood('neutral')}
        >
          <Feather name="meh" size={44} color={getMoodIconColor('neutral')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={getMoodButtonStyle('sad')}
          onPress={() => onSelectMood('sad')}
        >
          <Feather name="frown" size={44} color={getMoodIconColor('sad')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    marginVertical: 20,
    width: '100%', 
  },
  moodLabel: {
    fontSize: 20,
    marginBottom: 20,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%', 
  },
  moodButton: {
    padding: 12,
    borderRadius: 18,
  },
  lightText: {
     color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  lightMoodButton: { 
     backgroundColor: '#f0f0f0',
  },
  darkMoodButton: {
    backgroundColor: '#333',
  },
  moodSelectedHappy: {
    backgroundColor: '#e8f5e9',
    borderColor: '#2e7d32',
    borderWidth: 1.5,
  },
  moodSelectedNeutral: {
    backgroundColor: '#fffde7',
    borderColor: '#fbc02d',
    borderWidth: 1.5,
  },
  moodSelectedSad: {
    backgroundColor: '#ffebee',
    borderColor: '#d32f2f',
    borderWidth: 1.5,
  },
});