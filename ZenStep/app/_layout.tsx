import { Stack, router } from "expo-router";
import { useState, useEffect } from 'react'
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
// 1. Import the StatusBar component
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}

function RootStack() {
  const { contextTheme } = useTheme();
  const isDarkMode = contextTheme === 'dark';


  // --- Style definitions (no change) ---
  const mainHeaderStyle: NativeStackNavigationOptions = {
    headerStyle: { 
      backgroundColor: isDarkMode ? "#222" : "#0db6db",
    },
    headerTintColor: isDarkMode ? "#fff" : "#add8e6",
    headerTitleStyle: {
      fontSize: 25,
      fontWeight: '700',
      color: isDarkMode ? "#fff" : "#add8e6",
    },
    headerTitleAlign: 'left',
  };

  const modalHeaderStyle: NativeStackNavigationOptions = {
    headerStyle: { 
      backgroundColor: isDarkMode ? "#1c1c1e" : "#fff" 
    },
    headerTitleStyle: {
      color: isDarkMode ? "#fff" : "#000"
    },
    headerTintColor: isDarkMode ? "#fff" : "#0db6db",
    headerTitleAlign: 'left',
  };


  return (
    // 2. Wrap your Stack in a Fragment <>
    <>
      {/* 3. Add the StatusBar component here */}
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
      <Stack
        screenOptions={mainHeaderStyle}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        
        <Stack.Screen 
          name="onboarding" 
          options={{ 
            title: "Welcome",
            ...modalHeaderStyle 
          }} 
        />
        
        <Stack.Screen 
          name="(tabs)" 
          options={{
            title: "ZenStep",
            headerRight: () => (
              <TouchableOpacity onPress={() => router.push('/settings')}>
                <Ionicons 
                  name="settings-outline" 
                  size={24} 
                  color={mainHeaderStyle.headerTintColor} 
                  style={{ marginRight: 15 }} 
                />
              </TouchableOpacity>
            ),
          }} 
        />
        
        <Stack.Screen 
          name="settings" 
          options={{ 
            presentation: 'modal',
            title: "Settings",
            ...modalHeaderStyle
          }} 
        />
      </Stack>
    </>
  );
}