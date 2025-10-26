import { useEffect } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const ONBOARDING_KEY = 'hasOnboarded';

export default function AppEntry() {
  useEffect(() => {
    const checkOnboarding = async (): Promise<void> => {
      try {
        const hasOnboarded = await AsyncStorage.getItem(ONBOARDING_KEY);
        
        if (hasOnboarded) {
          router.replace('/(tabs)/home'); 
        } else {
          router.replace('/onboarding');
        }
      } catch (e) {
        console.error("Error checking onboarding", e);
        router.replace('/(tabs)/home'); 
      } finally {
        SplashScreen.hideAsync();
      }
    };

    checkOnboarding();
  }, []);

  return <View />;
}