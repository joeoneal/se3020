import { Text, View, StyleSheet, Alert} from "react-native";
import {useState} from 'react'
import SearchBar from "@/components/home/SearchBar";
import FilterButton from "@/components/home/FilterButton";
import SearchButton from "@/components/home/SearchButton";
import {useRouter} from 'expo-router'

export default function Index() {

  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('song')
  const router = useRouter();

  const searchPress = () => {
    if (!searchTerm.trim()) {
      return
    }
    console.log(searchTerm)
    router.push({
      pathname: '/results',
      params: {
        term: searchTerm,
        filter: activeFilter
      }
    })
    
  }


  return (
    <View style={styles.container}>



      <Text style={styles.searchText}>Music Search</Text>

      <SearchBar
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FilterButton onPress={() => setActiveFilter('song')}>
        <Text>Song</Text>
      </FilterButton>

      <FilterButton onPress={() => setActiveFilter('artist')}>
        <Text>Artist</Text>
      </FilterButton>

      <FilterButton onPress={() => setActiveFilter('album')}>
        <Text>Album</Text>
      </FilterButton>

      <SearchButton onPress={searchPress}/>
      

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
