import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

const NavSeparator = () => {
  const { contextTheme } = useTheme();
  const isDarkMode = contextTheme === 'dark';
  return <View style={[styles.navSeparator, isDarkMode && styles.darkNavSeparator]} />;
};

export default function TabsLayout() {
  const { contextTheme } = useTheme();
  const isDarkMode = contextTheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0db6db',
        tabBarInactiveTintColor: isDarkMode ? '#777' : '#555',
        
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1c1c1e' : '#f8f8f8',
          borderTopColor: isDarkMode ? '#333' : '#eee',
          
          // 1. Keep minHeight
          minHeight: 90, 
          
          // 2. Increase paddingTop slightly
          paddingTop: 12, // <-- Changed from 10
          paddingBottom: 10
        },
        
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          // 3. Decrease marginTop slightly
          marginTop: 6, // <-- Changed from 5
        },
        
        tabBarItemStyle: {
          // No styles needed here
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Today', 
          tabBarIcon: ({ color }) => (
            <Ionicons 
              name="footsteps" 
              size={28} 
              color={color} 
            />
          ),
          tabBarBackground: () => <NavSeparator />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => (
            <Ionicons 
              name="calendar-outline" 
              size={28} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  navSeparator: {
    width: 1,
    height: '60%',
    backgroundColor: '#ccc',
    position: 'absolute',
    left: '50%',
    top: '20%',
  },
  darkNavSeparator: {
    backgroundColor: '#444',
  },
});