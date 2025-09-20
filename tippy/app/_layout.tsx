import { Stack } from "expo-router";

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
      }}
    >
      <Stack.Screen name="index" options={{ title: "Tip Calculator" }} />
      <Stack.Screen name="summary" options={{ title: "Summary" }} />
    </Stack>
  );
}
