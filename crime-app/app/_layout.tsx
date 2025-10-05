import { Stack, useRouter } from "expo-router";
import AddCrimeButton from "@/components/AddCrime";
import { CrimeProvider } from "@/contexts/CrimeContext";

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
              <AddCrimeButton
                onPress={() => router.push({
                  pathname: '/crimes',
                })}
              />
            )
          }}
        />

        <Stack.Screen
          name="crimes"
          options={{
            title: "Criminal Intent"
          }}
        />

      </Stack>
      </CrimeProvider>
  );
}