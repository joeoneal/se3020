import { View, StyleSheet, Text, FlatList, ActivityIndicator, Image, Pressable, } from 'react-native'
import useMusicData from '@/hooks/useMusicData'
import { SkeletonItem, MusicListItem } from '@/components/results/MusicListItem'


// https://itunes.apple.com/search

export default function Results() {
    const  { data } = useMusicData()
    const renderItem = ({ item }) => (
        <MusicListItem item={item} />
    )
    return (
        <View style={styles.container}>
            {/* {!data && (<ActivityIndicator size="large" color="#0000ff" />)} */}
            {!data && (
                <View style= {styles.container}>
                    <SkeletonItem/><SkeletonItem/><SkeletonItem/><SkeletonItem/><SkeletonItem/><SkeletonItem/><SkeletonItem/><SkeletonItem/><SkeletonItem/>
                </View>
            )}
            {data && (
                <FlatList
                    data={data.results}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => {
                        const id = item.trackId || item.collectionId || item.artistId;
                        return id ? id.toString() : index.toString(); 
                    }}
                    style={styles.list}
                />
            )}
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 7, // No longer needed with header
    },
})