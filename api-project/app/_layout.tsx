import { Stack } from "expo-router";
import { StyleSheet } from 'react-native'

export default function RootLayout() {
  return (
    <Stack screenOptions={{
        headerShown: false,
        contentStyle: styles.global
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  )
}

const styles = StyleSheet.create({
  global: {
    backgroundColor: '##e6e5dc'
  }
})
