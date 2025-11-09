import React from 'react';
import { View, StyleSheet, Text, Image, FlatList, Pressable } from 'react-native';

export const CollectionDetails = ({ item, songs, largeArtwork }) => {
    return (
        <FlatList
            data={songs}
            keyExtractor={(song) => song.trackId.toString()}
            ListHeaderComponent={
                <View style={styles.contentHeaderContainer}>
                    <Image 
                        source={{ uri: largeArtwork }} 
                        style={styles.image} 
                    />
                    <Text style={styles.title}>{item.collectionName}</Text>
                    <Text style={styles.subtitle}>{item.artistName}</Text>
                </View>
            }
            renderItem={({ item: song }) => (
                <Pressable style={styles.songRow}>
                    <Text style={styles.songNumber}>{song.trackNumber}.</Text>
                    <View style={styles.songTextContainer}>
                        <Text style={styles.songTitle}>
                            {song.trackName}
                        </Text>
                    </View>
                </Pressable>
            )}
            contentContainerStyle={styles.scrollContentContainer}
        />
    );
};

const styles = StyleSheet.create({
    scrollContentContainer: {
        paddingTop: 80,
        paddingHorizontal: 20,
        paddingBottom: 60,
    },
    contentHeaderContainer: {
        alignItems: 'center', 
    },
    image: {
        width: '90%',
        aspectRatio: 1,
        borderRadius: 12,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
    },
    title: {
        fontSize: 28, 
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#111',
    },
    subtitle: {
        fontSize: 22, 
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
    },
    songRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 25,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        borderRadius: 8,
        marginBottom: 6,
    },
    songNumber: {
        fontSize: 16,
        color: '#888',
        width: 30,
        textAlign: 'right',
        marginRight: 10,
    },
    songTextContainer: {
        flex: 1, 
    },
    songTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111',
    },
});