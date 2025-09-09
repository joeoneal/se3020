import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        title: "State Capitol Quiz", 
        headerStyle: { backgroundColor: "red" },
        headerTintColor: "white",
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="cheat" />
    </Stack>
  );
}