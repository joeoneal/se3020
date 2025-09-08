import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "State Capitol Quiz",
          headerStyle: {backgroundColor: "red"},
          headerTintColor: "white"
        }}
      />
    </Stack>
  );
}
