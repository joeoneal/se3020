import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput,
  Keyboard,
  TouchableWithoutFeedback // 1. Import TouchableWithoutFeedback
} from 'react-native';
import { Stack, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';

const ONBOARDING_KEY = 'hasOnboarded';
const STEP_GOAL_KEY = 'userStepGoal';

export default function OnboardingScreen() {
  const [stepGoal, setStepGoal] = useState(10000);
  const { contextTheme, changeTheme } = useTheme();
  const isDarkMode = contextTheme === 'dark';

  // ... (All your helper functions: handleStart, handleIncrease, handleDecrease, handleTextChange) ...
  const handleStart = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(STEP_GOAL_KEY, stepGoal.toString());
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      router.replace('/(tabs)/home'); 
    } catch (e) {
      console.error("Failed to save onboarding status", e);
    }
  };

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

  // ... (All your dynamic style helpers: containerStyle, textStyle, etc.) ...
  const containerStyle = [styles.container, isDarkMode && styles.darkContainer];
  const textStyle = [isDarkMode && styles.darkText];
  const mutedTextStyle = [styles.subTitle, isDarkMode && styles.darkMutedText];
  const labelStyle = [styles.label, isDarkMode && styles.darkText];
  const stepInputStyle = [styles.stepInput, isDarkMode && styles.darkStepInput];
  const stepButtonStyle = [styles.stepButton, isDarkMode && styles.darkStepButton];
  const stepButtonTextStyle = [styles.stepButtonText, isDarkMode && styles.darkStepButtonText];
  
  const getThemeButtonStyle = (theme: 'light' | 'dark') => {
    const baseStyle = [styles.themeButton, isDarkMode && styles.darkThemeButton];
    if (contextTheme === theme) {
      baseStyle.push(styles.themeButtonSelected);
    }
    return baseStyle;
  };
  
  const getThemeButtonTextStyle = (theme: 'light' | 'dark') => {
    const baseStyle = [styles.themeButtonText, isDarkMode && styles.darkThemeButtonText];
    if (contextTheme === theme) {
      baseStyle.push(styles.themeButtonTextSelected);
    }
    return baseStyle;
  };

  return (
    // 2. Wrap the main View
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={containerStyle}>
        <Stack.Screen 
          options={{ 
            title: "Welcome",
          }} 
        />
        
        <Image 
          source={require('../assets/images/walking2.png')} 
          style={styles.image} 
        />

        <Text style={[styles.welcomeTitle, textStyle]}>Welcome to ZenStep!</Text>
        <Text style={mutedTextStyle}>
          Connect with your daily movement and track your your mood for a balanced, mindful life.
        </Text>

        <View style={styles.interactiveContainer}>
          
          <View style={styles.sectionContainer}>
            <Text style={labelStyle}>Your Daily Step Goal:</Text>
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
                placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
              />
              
              <TouchableOpacity style={stepButtonStyle} onPress={handleIncrease}>
                <Text style={stepButtonTextStyle}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={labelStyle}>Theme:</Text>
            <View style={styles.themeContainer}>
              <TouchableOpacity 
                style={getThemeButtonStyle('light')} 
                onPress={() => changeTheme('light')}
              >
                <Text style={getThemeButtonTextStyle('light')}>Light</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={getThemeButtonStyle('dark')} 
                onPress={() => changeTheme('dark')}
              >
                <Text style={getThemeButtonTextStyle('dark')}>Dark</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>Start Your Journey</Text>
          </TouchableOpacity>

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// ... (Your complete styles object remains the same) ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  image: {
    width: 400,
    height: 250,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  darkMutedText: {
    color: '#999',
  },
  interactiveContainer: {
    flex: 1,
    width: '100%', 
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
  },
  sectionContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15, 
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
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 15,
  },
  themeButton: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
  },
  darkThemeButton: {
    backgroundColor: '#333',
    borderColor: '#555',
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
  darkThemeButtonText: {
    color: '#999',
  },
  themeButtonTextSelected: {
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#0db6db',
    paddingVertical: 15,
    paddingHorizontal: 77,
    borderRadius: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  }
});