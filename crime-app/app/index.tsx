import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useCrimes } from "/Users/joeoneal/senior/se3020/se3020/crime-app/contexts/CrimeContext"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { unlockAsync,addOrientationChangeListener,removeOrientationChangeListener, Orientation } from "expo-screen-orientation";
import { useState, useEffect } from 'react'



export default function HomeScreen() {
  const { crimes } = useCrimes();
  const router = useRouter();
  const [orientation, setOrientation] = useState(Orientation.PORTRAIT_UP);

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
                <Text>{item.date.toISOString()}</Text>
              </View>

              {item.isSolved && (
                <MaterialCommunityIcons name="handcuffs" size={24} color="black" />
              )}
            </View>
          </Pressable>
          
        )}
        ListEmptyComponent={<Text>No crimes reported yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  crimeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crimeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});