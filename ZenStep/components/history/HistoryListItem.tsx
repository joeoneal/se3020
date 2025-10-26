import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { HistoryItem } from '../../hooks/useHistoryData'; // Import type

type HistoryListItemProps = {
  item: HistoryItem;
  isDarkMode: boolean;
};

const MoodIcon = ({ mood }: { mood: HistoryItem['mood'] }) => {
  const iconName = mood === 'happy' ? 'smile' : mood === 'neutral' ? 'meh' : 'frown';
  const color = mood === 'happy' ? '#2e7d32' : mood === 'neutral' ? '#fbc02d' : '#d32f2f';
  return <Feather name={iconName} size={30} color={color} />;
};

export default function HistoryListItem({ item, isDarkMode }: HistoryListItemProps) {
  const goalReached = item.steps >= item.goal;

  return (
    <View style={[styles.itemContainer, isDarkMode && styles.darkItemContainer]}>
      <View>
        <Text style={[styles.itemDate, isDarkMode && styles.darkText]}>
          {new Date(item.date).toDateString()}
        </Text>

        <Text style={[styles.itemGoal, isDarkMode && styles.darkMutedText]}>
          Goal: {item.goal.toLocaleString()} steps
        </Text>

        <View style={styles.stepRow}>
          <Text style={styles.itemSteps}>{item.steps.toLocaleString()} steps</Text>
          {goalReached && (
            <Text style={styles.goalReachedText}>Goal reached!</Text>
          )}
        </View>
      </View>
      <MoodIcon mood={item.mood} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
  },
  darkItemContainer: {
    backgroundColor: '#222',
  },
  itemDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  itemGoal: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginTop: 8,
  },
  darkMutedText: {
    color: '#999',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemSteps: {
    fontSize: 16,
    color: '#0db6db',
    fontWeight: '500',
  },
  goalReachedText: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: 'bold',
    marginLeft: 10,
    fontStyle: 'italic',
  },
});