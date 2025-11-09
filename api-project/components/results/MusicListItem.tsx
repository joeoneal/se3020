import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import getInitials from '@/components/variety/getInitials'

export const MusicListItem = ({ item }) => {
    const router = useRouter();

    const cardPress = (id: number | string) => {
        router.push({
            pathname: '/[id]',
            params: { id: id.toString() },
        });
    };

    let imageUrl, title, subtitle, id;

    switch (item.wrapperType) {
        case 'track':
            imageUrl = item.artworkUrl100;
            title = item.trackName;
            subtitle = item.artistName;
            id = item.trackId;
            break;
        case 'collection':
            imageUrl = item.artworkUrl100;
            title = item.collectionName;
            subtitle = item.artistName;
            id = item.collectionId;
            break;
        case 'artist':
            imageUrl = item.artworkUrl100; // API sometimes provides this, sometimes not
            title = item.artistName;
            subtitle = item.primaryGenreName || 'Artist';
            id = item.artistId;
            break;
        default:
            title = 'Unknown';
            subtitle = 'Unknown Type';
            imageUrl = null;
            id = item.trackId || item.collectionId || item.artistId || Math.random().toString();
            break;
    }

    const finalId = id || Math.random().toString(); 

    return (
        <Pressable onPress={() => cardPress(finalId)}>
            <View style={styles.itemContainer}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                ) : item.wrapperType === 'artist' ? (
                    <View style={styles.initialsContainer}>
                        <Text style={styles.initialsText}>{getInitials(item.artistName)}</Text>
                    </View>
                ) : (
                    <Image 
                        source={require('@/assets/images/pholder.png')} 
                        style={styles.image} 
                    />
                )}
                
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export const SkeletonItem = () => (
    <View style={styles.itemContainer}>
        <View style={styles.skeletonImage} />
        <View style={styles.textContainer}>
            <View style={styles.skeletonTextTitle} />
            <View style={styles.skeletonTextSubtitle} />
        </View>
    </View>
);


const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 4, 
        marginRight: 15,
        backgroundColor: '#ccc',
    },
    initialsContainer: {
        width: 60,
        height: 60,
        borderRadius: 30, // Circle
        marginRight: 15,
        backgroundColor: '#5A67D8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialsText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    skeletonImage: {
        width: 60,
        height: 60,
        borderRadius: 4,
        marginRight: 15,
        backgroundColor: '#e0e0e0',
    },
    skeletonTextTitle: {
        width: '70%',
        height: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
    skeletonTextSubtitle: {
        width: '40%',
        height: 14,
        marginTop: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
});