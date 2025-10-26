import React from 'react';
import { View, StyleSheet, Keyboard, Platform, InputAccessoryView, TouchableOpacity, Text } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';
import useSettings from '../hooks/useSettings';
import StepGoalSelector from '../components/settings/StepGoalSelector';
import ThemeSelector from '../components/settings/ThemeSelector';
import DataManagementSection from '../components/settings/DataManagement';
import AboutSection from '../components/settings/AboutSection';

const inputAccessoryViewID = 'stepGoalInputAccessory';

export default function SettingsScreen() {
  const {
    stepGoal,
    handleIncrease,
    handleDecrease,
    handleTextChange,
    handleClearHistory,
  } = useSettings();

  const { contextTheme, changeTheme } = useTheme();
  const isDarkMode = contextTheme === 'dark';

  const containerStyle = [styles.container, isDarkMode && styles.darkContainer];

  return (
    <View style={containerStyle}>
      <Stack.Screen options={{ title: "Settings" }} />

      <View style={styles.contentWrapper}>
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

        <DataManagementSection
          onClearHistory={handleClearHistory}
          isDarkMode={isDarkMode}
        />
      </View>

      <AboutSection isDarkMode={isDarkMode} />

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  contentWrapper: {},
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