import { Stack } from "expo-router";
import { StyleSheet, } from 'react-native'
import  { useRouter } from 'expo-router'

export default function RootLayout() {
  const router = useRouter()
  return (
    <Stack screenOptions={{
        headerShown: false,
        contentStyle: styles.global
      }}
    >
      <Stack.Screen name="index"/>
    </Stack>
  )
}

const styles = StyleSheet.create({
  global: {
    backgroundColor: '##e6e5dc'
  }
})
