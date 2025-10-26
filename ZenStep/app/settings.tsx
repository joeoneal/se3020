import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Keyboard, 
  Alert,
  Button 
} from 'react-native';
import { Stack, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STEP_GOAL_KEY = 'userStepGoal';
const THEME_KEY = 'appTheme';
const HISTORY_KEY = 'history';

export default function SettingsScreen() {
  const [stepGoal, setStepGoal] =useState(10000);
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light');

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
  }, [stepGoal, selectedTheme]); 

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
    setSelectedTheme(theme);
    Alert.alert("Theme Changed", `Theme set to ${theme}. (Not yet implemented)`);
  };

  const handleClearHistory = () => {
    Alert.alert(
      "Clear All History",
      "Are you sure? This action cannot be undone and will permanently delete all step and mood history.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
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

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Settings",
        }} 
      />
      
      {/* Wrapper for top content */}
      <View>
        {/* --- Daily Goal Section --- */}
        <View style={styles.section}>
          <Text style={styles.label}>Daily Goal</Text>
          <View style={styles.stepContainer}>
            <TouchableOpacity style={styles.stepButton} onPress={handleDecrease}>
              <Text style={styles.stepButtonText}>-</Text>
            </TouchableOpacity>
            
            <TextInput
              style={styles.stepInput}
              value={stepGoal.toString()} 
              onChangeText={handleTextChange}
              keyboardType="number-pad"
              selectTextOnFocus
            />
            
            <TouchableOpacity style={styles.stepButton} onPress={handleIncrease}>
              <Text style={styles.stepButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Theme Section --- */}
        <View style={styles.section}>
          <Text style={styles.label}>Theme</Text>
          <View style={styles.themeContainer}>
            <TouchableOpacity 
              style={[styles.themeButton, selectedTheme === 'light' && styles.themeButtonSelected]} 
              onPress={() => handleThemeSelect('light')}
            >
              <Text style={[styles.themeButtonText, selectedTheme === 'light' && styles.themeButtonTextSelected]}>Light</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.themeButton, selectedTheme === 'dark' && styles.themeButtonSelected]} 
              onPress={() => handleThemeSelect('dark')}
            >
              <Text style={[styles.themeButtonText, selectedTheme === 'dark' && styles.themeButtonTextSelected]}>Dark</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Data Management Section --- */}
        <View style={styles.section}>
          <Text style={styles.label}>Data Management</Text>
          <Button 
            title="Clear All History" 
            onPress={handleClearHistory} 
            color="#d32f2f" 
          />
        </View>
      </View>
      
      {/* --- About Section --- */}
      <View style={styles.section}>
        <Text style={styles.label}>About</Text>
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>Copyright 2025</Text>
          <Text style={styles.aboutText}>Version 1.0.0</Text>
        </View>
      </View>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  section: {
    marginBottom: 40, // <-- INCREASED for more vertical spacing
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
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
  stepButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0db6db',
    lineHeight: 30,
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
  aboutText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  }
});