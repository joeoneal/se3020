import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput,
  Keyboard 
} from 'react-native';
import { Stack, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'hasOnboarded';
const STEP_GOAL_KEY = 'userStepGoal';

export default function OnboardingScreen() {
  const [stepGoal, setStepGoal] = useState(10000);

  const handleStart = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(STEP_GOAL_KEY, stepGoal.toString());
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');

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
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "ZenStep",
        }} 
      />
      
      <Image 
        source={require('../assets/images/walking2.png')} 
        style={styles.image} 
      />

      <Text style={styles.welcomeTitle}>Welcome to ZenStep!</Text>
      <Text style={styles.subTitle}>
        Connect with your daily movement and track your your mood for a balanced, mindful life.
      </Text>

      <View style={styles.interactiveContainer}>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Your Daily Step Goal:</Text>
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

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Theme:</Text>
          <View style={styles.themeContainer}>
            <TouchableOpacity 
              style={styles.themeButton} 
              onPress={() => { /* Does nothing for now */ }}
            >
              <Text style={styles.themeButtonText}>Light</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.themeButton} 
              onPress={() => { /* Does nothing for now */ }}
            >
              <Text style={styles.themeButtonText}>Dark</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Start Your Journey</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
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
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 15,
  },
  themeButton: {
    borderWidth: 1.5,
    borderColor: '#0db6db',
    backgroundColor: '#f9f9f9',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
  },
  themeButtonText: {
    color: '#0db6db',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#0db6db',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  }
});