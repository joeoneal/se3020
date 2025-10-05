import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useCrimes } from "/Users/joeoneal/senior/se3020/se3020/crime-app/contexts/CrimeContext"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { unlockAsync,addOrientationChangeListener,removeOrientationChangeListener, Orientation } from "expo-screen-orientation";
import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext';
import { Theme, themes } from '@/constants/Themes';


const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  crimeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    marginBottom: 10,
    borderRadius: 8,
  },
  crimeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },

  crimeDate: {
    fontSize: 14,
    color: theme.colors.text,
  },
  emptyText: {
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: 20,
  },
});



export default function HomeScreen() {
  const { crimes } = useCrimes();
  const router = useRouter();
  const [orientation, setOrientation] = useState(Orientation.PORTRAIT_UP);

  const { contextTheme } = useTheme(); 
  const activeTheme = themes[contextTheme as keyof typeof themes] || themes.White;
  const styles = getStyles(activeTheme); 


  useEffect(() => {
    console.log("Component mounted");
    unlockAsync();

    const subscription = addOrientationChangeListener((event) => {
      console.log(event)
      console.log("Orientation changed");
      setOrientation(event.orientationInfo.orientation);


    });

    return () => {
      console.log("Component unmounted");
      removeOrientationChangeListener(subscription);
    };
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={crimes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({ pathname: '/crimes', params: {id: item.id } })}>
            <View style={styles.crimeItem}>
              <View>
                <Text style={styles.crimeTitle}>{item.title}</Text>
                <Text style={styles.crimeDate}>{item.date.toISOString()}</Text>
              </View>

              {item.isSolved && (
                <MaterialCommunityIcons name="handcuffs" size={24} color={styles.crimeTitle.color} />
              )}
            </View>
          </Pressable>
          
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No crimes reported yet.</Text>}
      />
    </View>
  );
}

