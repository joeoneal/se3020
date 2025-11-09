import { Stack } from "expo-router";
import { StyleSheet, } from 'react-native'

export default function RootLayout() {
  return (
    <Stack screenOptions={{
        headerStyle: { backgroundColor: '#f0f1f2'},
        headerShown: false,
        contentStyle: styles.global,
      }}
    >
      <Stack.Screen name="index" options={{title: 'Search'}}/>
      <Stack.Screen name='results' options=
        {{
          headerShown: true, 
          title: 'Results',
          headerShadowVisible: false,
          headerTintColor: 'black'
        }}
      />
      <Stack.Screen name='[id]'
        options = {{
          headerShown: true,
          title: '',
          headerShadowVisible: false,
          headerTintColor: 'black'
        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
  global: {
    backgroundColor: '#f0f1f2'
  }
})
