import { Stack, useRouter } from "expo-router";
import { View } from 'react-native';
import AddCrimeButton from "@/components/AddCrime";
import SettingsCog from "@/components/SettingsCog";
import { CrimeProvider } from "@/contexts/CrimeContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/constants/Themes";

function AppLayout() {
  const { contextTheme } = useTheme();
  const router = useRouter();
  const activeTheme = themes[contextTheme as keyof typeof themes] || themes.White;

  return (
    <Stack 
      screenOptions={{
        headerStyle: { backgroundColor: activeTheme.colors.primary },
        headerTintColor: activeTheme.colors.text
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

      <Stack.Screen 
        name="settings" 
        options={{ 
          title: "Settings",
          headerRight: () => null 
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CrimeProvider>
        <AppLayout />
      </CrimeProvider>
    </ThemeProvider>
  );
}