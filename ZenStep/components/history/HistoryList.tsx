import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { HistoryItem } from '../../hooks/useHistoryData'; // Import type
import HistoryListItem from './HistoryListItem'; // Import the item component

type HistoryListProps = {
  history: HistoryItem[];
  isDarkMode: boolean;
};

export default function HistoryList({ history, isDarkMode }: HistoryListProps) {
  const renderItem = ({ item }: { item: HistoryItem }) => (
    <HistoryListItem item={item} isDarkMode={isDarkMode} />
  );

  return (
    <FlatList
      data={history}
      renderItem={renderItem}
      keyExtractor={(item) => item.date}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
});