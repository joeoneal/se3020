import React from 'react';
import { View, StyleSheet, Text, Image, FlatList, Pressable } from 'react-native';
import getInitials from '@/components/variety/getInitials'; // Import moved here

export const ArtistDetails = ({ item, songs }) => {
    return (
        <FlatList
            data={songs} 
            keyExtractor={(song) => song.trackId.toString()}
            ListHeaderComponent={
                <View style={styles.contentHeaderContainer}>
                    <View style={styles.initialsContainer}>
                        <Text style={styles.initialsText}>
                            {getInitials(item.artistName)}
                        </Text>
                    </View>
                    <Text style={styles.title}>{item.artistName}</Text>
                    <Text style={styles.subtitle}>{item.primaryGenreName}</Text>
                    
                    <Text style={styles.listHeader}>Top Songs</Text>
                </View>
            }
            renderItem={({ item: song }) => (
                <Pressable style={styles.artistSongRow}>
                    <Image 
                        source={{ uri: song.artworkUrl100 }} 
                        style={styles.artistSongImage} 
                    />
                    <View style={styles.songTextContainer}>
                        <Text style={styles.songTitle}>
                            {song.trackName}
                        </Text>
                        <Text style={styles.songSubtitle}>
                            {song.collectionName}
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
    songTextContainer: {
        flex: 1, 
    },
    songTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111',
    },
    songSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    initialsContainer: {
        width: 150, 
        height: 150,
        borderRadius: 75, 
        backgroundColor: '#5A67D8', 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
    },
    initialsText: {
        color: '#fff',
        fontSize: 60, 
        fontWeight: 'bold',
    },
    listHeader: { 
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
        width: '100%',
        marginTop: 16, 
        marginBottom: 8,  
    },
    artistSongRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12, 
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8, 
    },
    artistSongImage: {
        width: 60, 
        height: 60, 
        borderRadius: 4,
        marginRight: 15, 
    },
});