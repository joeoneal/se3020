import { Stack, router } from "expo-router"; // <-- Import router
import { TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0db6db" },
        headerTintColor: "#add8e6",
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: '700',
        },
        headerTitleAlign: 'left',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" />
      
      <Stack.Screen 
        name="(tabs)" 
        options={{
          title: "ZenStep",
          headerRight: () => (
            // --- UPDATE THIS OnPress ---
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <Ionicons name="settings-outline" size={24} color="#add8e6" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }} 
      />

      {/* --- ADD THIS NEW SCREEN --- */}
      {/* This presents the settings screen as a modal */}
      <Stack.Screen 
        name="settings" 
        options={{ 
          presentation: 'modal',
          // We can use the global styles, but override title in the file itself
        }} 
      />

    </Stack>
  );
}