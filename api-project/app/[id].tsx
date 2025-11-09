import useDetailsById from '@/hooks/useDetailsById'
import { useLocalSearchParams } from 'expo-router'
import { View, StyleSheet,Text, } from 'react-native'
import SkeletonLoader from '@/components/id/SkeletonLoader'
import { TrackDetails } from '@/components/id/TrackDetails'
import { CollectionDetails } from '@/components/id/CollectionDetails'
import { ArtistDetails } from '@/components/id/ArtistDetails'


export default function Details() {
    const { id } = useLocalSearchParams()
    const { data } = useDetailsById(id)

    if (!data) {
        return (
            <View style={styles.container}>
                <SkeletonLoader />
            </View>
        )
    }
    const item = data.results[0];
    if (!item) {
        return (
            <View style={styles.loadingContainer}>
                <Text>No details found.</Text>
            </View>
        )
    }

    const largeArtwork = item.artworkUrl100?.replace('100x100', '600x600');
    const songs = data.results.slice(1).filter(result => result.wrapperType === 'track');
    return (
        <View style={styles.container}>
            {item.wrapperType === 'track' && (
                <TrackDetails item={item} largeArtwork={largeArtwork} />
            )}
            
            {item.wrapperType === 'collection' && (
                <CollectionDetails item={item} songs={songs} largeArtwork={largeArtwork} />
            )}
            
            {item.wrapperType === 'artist' && (
                <ArtistDetails item={item} songs={songs} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f1f2',
    },
});