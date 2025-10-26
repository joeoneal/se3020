import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Keyboard, 
  Alert,
  Button,
  TouchableWithoutFeedback // 1. Import TouchableWithoutFeedback
} from 'react-native';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext'; 

const STEP_GOAL_KEY = 'userStepGoal';
const HISTORY_KEY = 'history';

export default function SettingsScreen() {
  const [stepGoal, setStepGoal] = useState(10000);
  const { contextTheme, changeTheme } = useTheme();

  // ... (All your useEffects and helper functions: loadSettings, saveGoal, handleIncrease, handleDecrease, handleTextChange, handleThemeSelect, handleClearHistory) ...
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedGoal = await AsyncStorage.getItem(STEP_GOAL_KEY);
        if (savedGoal) {
          setStepGoal(parseInt(savedGoal, 10));
        }
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const saveGoal = async () => {
      try {
        await AsyncStorage.setItem(STEP_GOAL_KEY, stepGoal.toString());
      } catch (e) {
        console.error("Failed to save step goal", e);
      }
    };
    const timerId = setTimeout(() => {
      saveGoal();
    }, 500); 

    return () => clearTimeout(timerId);
  }, [stepGoal]);

  const handleIncrease = () => {
    setStepGoal(currentGoal => currentGoal + 500);
    Keyboard.dismiss();
  };

  const handleDecrease = () => {
    setStepGoal(currentGoal => Math.max(0, currentGoal - 500));
    Keyboard.dismiss();
  };

  const handleTextChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const newGoal = parseInt(numericText, 10);
    setStepGoal(isNaN(newGoal) ? 0 : newGoal);
  };
  
  const handleThemeSelect = (theme: 'light' | 'dark') => {
    changeTheme(theme);
  };

  const handleClearHistory = () => {
    Alert.alert(
      "Clear All History",
      "Are you sure? This action cannot be undone and will permanently delete all step and mood history.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(HISTORY_KEY);
              Alert.alert("Success", "Your history has been cleared.");
            } catch (e) {
              console.error("Failed to clear history", e);
              Alert.alert("Error", "Could not clear history.");
            }
          },
        },
      ]
    );
  };

  // --- Dynamic Styles ---
  const isDarkMode = contextTheme === 'dark';
  const containerStyle = [styles.container, isDarkMode && styles.darkContainer];
  const labelStyle = [styles.label, isDarkMode && styles.darkText];
  const aboutContainerStyle = [styles.aboutContainer, isDarkMode && styles.darkSecondaryContainer];
  const aboutTextStyle = [styles.aboutText, isDarkMode && styles.darkText];
  const stepInputStyle = [styles.stepInput, isDarkMode && styles.darkStepInput];
  const stepButtonTextStyle = [styles.stepButtonText, isDarkMode && styles.darkStepButtonText];
  const stepButtonStyle = [styles.stepButton, isDarkMode && styles.darkStepButton];

  return (
    // 2. Wrap the main View
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={containerStyle}>
        <Stack.Screen 
          options={{ 
            title: "Settings",
          }} 
        />
        
        {/* Wrapper for top content */}
        <View>
          {/* --- Daily Goal Section --- */}
          <View style={styles.section}>
            <Text style={labelStyle}>Daily Goal</Text>
            <View style={styles.stepContainer}>
              <TouchableOpacity style={stepButtonStyle} onPress={handleDecrease}>
                <Text style={stepButtonTextStyle}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={stepInputStyle}
                value={stepGoal.toString()} 
                onChangeText={handleTextChange}
                keyboardType="number-pad"
                selectTextOnFocus
              />
              <TouchableOpacity style={stepButtonStyle} onPress={handleIncrease}>
                <Text style={stepButtonTextStyle}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* --- Theme Section --- */}
          <View style={styles.section}>
            <Text style={labelStyle}>Theme</Text>
            <View style={styles.themeContainer}>
              <TouchableOpacity 
                style={[styles.themeButton, contextTheme === 'light' && styles.themeButtonSelected]} 
                onPress={() => handleThemeSelect('light')}
              >
                <Text style={[styles.themeButtonText, contextTheme === 'light' && styles.themeButtonTextSelected]}>Light</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.themeButton, contextTheme === 'dark' && styles.themeButtonSelected]} 
                onPress={() => handleThemeSelect('dark')}
              >
                <Text style={[styles.themeButtonText, contextTheme === 'dark' && styles.themeButtonTextSelected]}>Dark</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* --- Data Management Section --- */}
          <View style={styles.section}>
            <Text style={labelStyle}>Data Management</Text>
            <Button 
              title="Clear All History" 
              onPress={handleClearHistory} 
              color="#d32f2f" 
            />
          </View>
        </View>
        
        {/* --- About Section --- */}
        <View style={styles.section}>
          <Text style={labelStyle}>About</Text>
          <View style={aboutContainerStyle}>
            <Text style={aboutTextStyle}>Copyright 2025</Text>
            <Text style={aboutTextStyle}>Version 1.0.0</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// --- Complete Styles ---
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
  section: {
    marginBottom: 40,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  darkText: {
    color: '#fff',
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
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  themeButton: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
    marginRight: 15,
  },
  themeButtonSelected: {
    backgroundColor: '#0db6db',
    borderColor: '#0db6db',
  },
  themeButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  themeButtonTextSelected: {
    color: '#fff',
  },
  aboutContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
  },
  darkSecondaryContainer: {
    backgroundColor: '#222',
  },
  aboutText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  }
});