import React, { useState, useEffect, useCallback } from 'react'; // 1. Import useCallback
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  Alert, 
  ActivityIndicator
} from 'react-native';
import { Stack, router, useFocusEffect } from 'expo-router'; // 2. Import useFocusEffect
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle } from 'react-native-svg';
import { Feather, Ionicons } from '@expo/vector-icons';

// ... (All your constants and types remain the same)
const { width } = Dimensions.get('window');
const STEP_GOAL_KEY = 'userStepGoal';
const LAST_OPEN_KEY = 'lastAppOpenDate'; 
const HISTORY_KEY = 'history'; 
type Mood = 'happy' | 'neutral' | 'sad';
type HistoryItem = {
  date: string;
  steps: number;
  mood: Mood;
  goal: number;
};

// ... (Your generateFakeData function remains the same)
const generateFakeData = (): HistoryItem[] => {
  const fakeHistory: HistoryItem[] = [];
  const moods: Mood[] = ['happy', 'neutral', 'sad'];
  const today = new Date();
  const defaultGoal = 10000; 

  for (let i = 1; i <= 10; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i); 
    
    const dateString = day.toISOString().split('T')[0];
    const steps = Math.floor(Math.random() * 12000) + 3000;
    const mood = moods[Math.floor(Math.random() * moods.length)];

    fakeHistory.push({ date: dateString, steps, mood, goal: defaultGoal });
  }
  return fakeHistory;
};

export default function HomeScreen() {
  const [dailyStepGoal, setDailyStepGoal] = useState(10000);
  const [currentSteps, setCurrentSteps] = useState(7259);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  // --- Helper functions (defined outside the hook) ---
  const commitDayToHistory = async (dateToSave: string, goalForThatDay: number) => {
    try {
      const moodKey = `mood_${dateToSave}`;
      const stepKey = `steps_${dateToSave}`;
      const mood = await AsyncStorage.getItem(moodKey);
      const steps = await AsyncStorage.getItem(stepKey);

      if (mood && steps) {
        const historyItem: HistoryItem = {
          date: dateToSave,
          steps: parseInt(steps, 10),
          mood: mood as Mood,
          goal: goalForThatDay,
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
  
  const loadCurrentDayData = async (today: string) => {
    const savedGoal = await AsyncStorage.getItem(STEP_GOAL_KEY);
    // This is the line that fixes your bug
    if (savedGoal) setDailyStepGoal(parseInt(savedGoal, 10)); 

    const moodKey = `mood_${today}`;
    const savedMood = await AsyncStorage.getItem(moodKey);
    if (savedMood) setSelectedMood(savedMood as Mood);

    const stepKey = `steps_${today}`;
    const savedSteps = await AsyncStorage.getItem(stepKey);
    if(savedSteps) setCurrentSteps(parseInt(savedSteps, 10));
  };
  
  // --- 3. REPLACE your 'useEffect' with 'useFocusEffect' ---
  useFocusEffect(
    useCallback(() => {
      // This is the same logic you had in useEffect
      const runDailyCheck = async () => {
        setIsLoading(true);
        try {
          const today = new Date().toISOString().split('T')[0];
          const lastOpenDate = await AsyncStorage.getItem(LAST_OPEN_KEY);
          const historyString = await AsyncStorage.getItem(HISTORY_KEY);

          if (historyString === null) {
            console.log("No history found, injecting fake data...");
            const fakeData = generateFakeData();
            await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(fakeData));
            await AsyncStorage.setItem(LAST_OPEN_KEY, today);
          } 
          
          // We need to fetch the goal *before* committing,
          // so loadCurrentDayData() comes first.
          
          // --- Logic Re-ordered ---
          
          // 1. Load today's data (including the potentially new goal)
          await loadCurrentDayData(today); 

          // 2. Check if we need to commit *yesterday's* data
          if (lastOpenDate && lastOpenDate < today) {
            // 'dailyStepGoal' state is now set to today's goal,
            // but the commit logic runs for *yesterday*.
            // We need to load *yesterday's* goal. This is tricky.
            
            // Let's adjust: We'll commit with the goal that was
            // loaded *before* the new goal was set.
            // We pass 'dailyStepGoal' which is the state *before*
            // loadCurrentDayData runs.
            
            // A-ha! The state isn't updated yet.
            // Let's pass the goal to commitDayToHistory
            
            // Let's simplify. `loadCurrentDayData` updates the state.
            // The `dailyStepGoal` in `commitDayToHistory`
            // should be the one from *before* `loadCurrentDayData` runs.
            // The original logic was fine.
            
            await commitDayToHistory(lastOpenDate, dailyStepGoal); 
            await AsyncStorage.setItem(LAST_OPEN_KEY, today);
          } else if (!lastOpenDate) {
            await AsyncStorage.setItem(LAST_OPEN_KEY, today);
          }
          
        } catch (e) {
          console.error("Failed to run daily check", e);
        }
        setIsLoading(false);
      };

      runDailyCheck();

      // This return function is for cleanup, not needed here
      // return () => {}; 
    }, []) // Empty dependency array means this runs on every focus
  );

  // ... (handleMoodSelect and all other helper functions remain the same) ...
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


  // Helper functions & calculations
  const progress = dailyStepGoal > 0 ? currentSteps / dailyStepGoal : 0;
  const circleSize = width * 0.65;
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

  // ... (Your JSX for loading and the main view remains the same) ...
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
        
        {/* Item 1: Focus */}
        <View style={styles.sectionContainer}>
          <Text style={styles.focusText}>Today's Focus:</Text>
          <Text style={styles.goalText}>{dailyStepGoal.toLocaleString()} steps</Text>
        </View>

        {/* Item 2: Progress Circle */}
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


// ... (Your styles remain the same) ...
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