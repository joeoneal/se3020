import { Text, View, StyleSheet, Alert} from "react-native";
import {useState} from 'react'
import SearchBar from "@/components/home/SearchBar";
import FilterButton from "@/components/home/FilterButton";
import SearchButton from "@/components/home/SearchButton";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('')
  const filterPress = () => {
    console.log('pressed')
    Alert.alert('pressed the button yo')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>Music Search</Text>

      <SearchBar
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FilterButton onPress={filterPress}>
        <Text>Song</Text>
      </FilterButton>

      <FilterButton onPress={filterPress}>
        <Text>Artist</Text>
      </FilterButton>

      <FilterButton onPress={filterPress}>
        <Text>Album</Text>
      </FilterButton>

      <SearchButton/>
      



    </View>
  );
}


const styles = StyleSheet.create({  
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    searchText: {
      color: 'red'
    },
})
