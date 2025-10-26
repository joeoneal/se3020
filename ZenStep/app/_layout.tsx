import { Stack } from "expo-router";
import { TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0db6db" },
        headerTintColor: "white",
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
          // --- ADD THIS LINE ---
          title: "ZenStep", // This will override the "(tabs)" text

          headerRight: () => (
            <TouchableOpacity onPress={() => Alert.alert("Settings", "Go to settings screen")}>
              <Ionicons name="settings-outline" size={24} color="#add8e6" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }} 
      />
    </Stack>
  );
}