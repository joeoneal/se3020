import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const NavSeparator = () => <View style={styles.navSeparator} />;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0db6db',
        tabBarInactiveTintColor: '#555',

        // --- Style for the whole bar ---
        tabBarStyle: {
          // REMOVED height, paddingTop, paddingBottom
          backgroundColor: '#f8f8f8',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },

        // --- Style for the text label ---
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          // REMOVED marginTop, paddingBottom
        },

        // --- Style for each tab item (icon + label) ---
        tabBarItemStyle: {
          // REMOVED all properties
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size }) => (
            // REMOVED View wrapper
            // We are now using the default 'size' prop
            // instead of hardcoding '32'
            <Ionicons name="footsteps" size={size} color={color} />
          ),
          tabBarBackground: () => <NavSeparator />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            // REMOVED View wrapper
            // We are now using the default 'size' prop
            <Ionicons name="calendar-outline" size={size} color={color} />
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
});