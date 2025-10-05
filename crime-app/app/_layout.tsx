import { Stack, useRouter } from "expo-router";
import AddCrimeButton from "@/components/AddCrime";
import { CrimeProvider } from "@/contexts/CrimeContext";
import { View } from 'react-native'
import SettingsCog from "@/components/SettingsCog";

export default function RootLayout() {
  const router = useRouter()
  return (
    <CrimeProvider>
      <Stack 
        screenOptions={{
          headerStyle: { backgroundColor: '#4287f5' },
          headerTintColor: "white"
        }}
      >
        <Stack.Screen 
          name="index"
          options={{
            title: "Criminal Intent",
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                <AddCrimeButton
                  onPress={() => router.push({
                    pathname: '/crimes',
                  })}
                />
                <SettingsCog 
                  onPress={() => router.push({
                  pathname: '/settings',
                })}
                />
              </View>
            )
          }}
        />

        <Stack.Screen
          name="crimes"
          options={{
            title: "Criminal Intent",
            headerRight: () => (
              <SettingsCog 
                  onPress={() => router.push({
                  pathname: '/settings',
                })}
                />
            )
          }}
        />

        <Stack.Screen name="settings" options={{ title: "Settings" }} />


      </Stack>
      </CrimeProvider>
  );
}