import { Text, View, StyleSheet, Alert} from "react-native";
import {useState} from 'react'
import SearchBar from "@/components/home/SearchBar";
import FilterButton from "@/components/home/FilterButton";
import SearchButton from "@/components/home/SearchButton";
import useSearchBar from '@/hooks/useSearchBar'

export default function Index() {

  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('song')

  const searchPress = useSearchBar(searchTerm, activeFilter)

  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>Music Search</Text>
      <SearchBar
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View style = {styles.filterContainer}>
        <FilterButton onPress={() => setActiveFilter('song')} isActive={activeFilter === 'song'} title={'Songs'}/>
        <FilterButton onPress={() => setActiveFilter('musicArtist')} isActive={activeFilter === 'musicArtist'} title={'Artists'}/>
        <FilterButton onPress={() => setActiveFilter('album')} isActive={activeFilter === 'album'} title={'Albums'}/>
      </View>

      <SearchButton style={styles.SearchButton} onPress={searchPress}/>
    </View>
  );
}


const styles = StyleSheet.create({  
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",     
    paddingHorizontal: 20, 
    paddingVertical: 40,   
  },
  searchText: {
    color: '#1C1C1E', 
    fontSize: 52, 
    fontWeight: '200', 
    marginBottom: 40, 
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', 
    marginVertical: 30,
    gap: 12, 
    paddingBottom: 50,
  },
  filterButton: {
    flex: 1, 
  },
  spacer: {
    flex: 1, 
  },

  SearchButton: {
    width: '80%'
  }

})