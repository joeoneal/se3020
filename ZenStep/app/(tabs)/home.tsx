import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
// Note: 'Stack' is no longer imported here
import { router } from 'expo-router'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle } from 'react-native-svg';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const STEP_GOAL_KEY = 'userStepGoal';
const LAST_OPEN_KEY = 'lastAppOpenDate'; // Key to track the date
const HISTORY_KEY = 'history'; // Key for the history list

type Mood = 'happy' | 'neutral' | 'sad';

export default function HomeScreen() {
  const [dailyStepGoal, setDailyStepGoal] = useState(10000);
  const [currentSteps, setCurrentSteps] = useState(7259);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isLoading, setIsLoading] = useState(true); // For the daily check

  // --- "END OF DAY" LOGIC ---
  useEffect(() => {
    const runDailyCheck = async () => {
      setIsLoading(true);
      try {
        const today = new Date().toISOString().split('T')[0];
        const lastOpenDate = await AsyncStorage.getItem(LAST_OPEN_KEY);

        if (lastOpenDate && lastOpenDate < today) {
          // A new day has started! Commit yesterday's data.
          await commitDayToHistory(lastOpenDate);
        }
        
        // Now, load today's data
        await loadCurrentDayData(today);

        // Finally, set the last open date to today
        await AsyncStorage.setItem(LAST_OPEN_KEY, today);

      } catch (e) {
        console.error("Failed to run daily check", e);
      }
      setIsLoading(false);
    };

    // Helper function to save the previous day's data
    const commitDayToHistory = async (dateToSave: string) => {
      try {
        const moodKey = `mood_${dateToSave}`;
        const stepKey = `steps_${dateToSave}`;

        const mood = await AsyncStorage.getItem(moodKey);
        const steps = await AsyncStorage.getItem(stepKey);

        if (mood && steps) {
          const historyItem = {
            date: dateToSave,
            steps: parseInt(steps, 10),
            mood: mood as Mood,
          };

          const historyString = await AsyncStorage.getItem(HISTORY_KEY);
          const history = historyString ? JSON.parse(historyString) : [];
          
          if (!history.find((item: any) => item.date === dateToSave)) {
            history.push(historyItem);
            await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
          }
        }
        await AsyncStorage.removeItem(moodKey);
        await AsyncStorage.removeItem(stepKey);
      } catch (e) {
        console.error("Failed to commit history", e);
      }
    };
    
    // Helper function to load today's data
    const loadCurrentDayData = async (today: string) => {
      const savedGoal = await AsyncStorage.getItem(STEP_GOAL_KEY);
      if (savedGoal) setDailyStepGoal(parseInt(savedGoal, 10));

      const moodKey = `mood_${today}`;
      const savedMood = await AsyncStorage.getItem(moodKey);
      if (savedMood) setSelectedMood(savedMood as Mood);

      const stepKey = `steps_${today}`;
      const savedSteps = await AsyncStorage.getItem(stepKey);
      if(savedSteps) setCurrentSteps(parseInt(savedSteps, 10));
    };

    runDailyCheck();
  }, []); // Runs once on mount

  const progress = dailyStepGoal > 0 ? currentSteps / dailyStepGoal : 0;

  // --- UPDATED MOOD HANDLER ---
  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood);
    try {
      const today = new Date().toISOString().split('T')[0];
      const moodKey = `mood_${today}`;
      const stepKey = `steps_${today}`; 

      await AsyncStorage.setItem(moodKey, mood);
      await AsyncStorage.setItem(stepKey, currentSteps.toString());
  
      Alert.alert("Mood Logged", `You logged: ${mood.charAt(0).toUpperCase() + mood.slice(1)}`);
    } catch (e) {
      console.error("Failed to save mood", e);
    }
  };

  const circleSize = width * 0.80;
  const strokeWidth = 25;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.min(progress, 1));

  const getMoodButtonStyle = (mood: Mood) => {
    if (selectedMood !== mood) return styles.moodButton;
    if (mood === 'happy') return [styles.moodButton, styles.moodSelectedHappy];
    if (mood === 'neutral') return [styles.moodButton, styles.moodSelectedNeutral];
    if (mood === 'sad') return [styles.moodButton, styles.moodSelectedSad];
  };

  const getMoodIconColor = (mood: Mood) => {
    if (selectedMood !== mood) return '#555';
    if (mood === 'happy') return '#2e7d32';
    if (mood === 'neutral') return '#fbc02d';
    if (mood === 'sad') return '#d32f2f';
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#0db6db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <View style={styles.sectionContainer}>
          <Text style={styles.focusText}>Today's Focus:</Text>
          <Text style={styles.goalText}>{dailyStepGoal.toLocaleString()} steps</Text>
        </View>

        <View style={styles.progressCircleContainer}>
          <Svg height={circleSize} width={circleSize} viewBox={`0 0 ${circleSize} ${circleSize}`}>
            <Circle
              stroke="#e6e6e6"
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
            <Text style={styles.currentStepsText}>{currentSteps.toLocaleString()}</Text>
            <Text style={styles.stepsLabel}>steps</Text>
          </View>
        </View>

        {/* Item 3: Mood Logger */}
        <View style={styles.sectionContainer}>
          <Text style={styles.moodLabel}>Log your mood</Text>
          <View style={styles.moodContainer}>
            <TouchableOpacity 
              style={getMoodButtonStyle('happy')} 
              onPress={() => handleMoodSelect('happy')}
            >
              <Feather name="smile" size={44} color={getMoodIconColor('happy')} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={getMoodButtonStyle('neutral')} 
              onPress={() => handleMoodSelect('neutral')}
            >
              <Feather name="meh" size={44} color={getMoodIconColor('neutral')} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={getMoodButtonStyle('sad')} 
              onPress={() => handleMoodSelect('sad')}
            >
              <Feather name="frown" size={44} color={getMoodIconColor('sad')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'space-around',
  },
  sectionContainer: {
    alignItems: 'center',
  },
  focusText: {
    fontSize: 26,
    color: '#333',
    fontWeight: '500',
    marginBottom: 5,
  },
  goalText: {
    fontSize: 34,
    fontWeight: '700',
    color: '#0db6db',
  },
  progressCircleContainer: {
    width: width * 0.65,
    height: width * 0.65,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
  moodLabel: {
    fontSize: 20,
    color: '#333',
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
    backgroundColor: '#f0f0f0',
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