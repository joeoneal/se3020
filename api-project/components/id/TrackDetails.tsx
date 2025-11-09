import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

export const TrackDetails = ({ item, largeArtwork }) => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContentContainer}> 
            <View style={styles.contentHeaderContainer}>
                <Image 
                    source={{ uri: largeArtwork }} 
                    style={styles.image} 
                />
                
                <Text style={styles.title}>{item.trackName}</Text>
                <Text style={styles.subtitle}>{item.artistName}</Text>

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoLabel}>Album: </Text>
                        {item.collectionName}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoLabel}>Genre: </Text>
                        {item.primaryGenreName}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoLabel}>Released: </Text>
                        {new Date(item.releaseDate).toLocaleDateString()}
                    </Text>
                </View>
            </View>
        </ScrollView>
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
    infoBox: {
        width: '100%',
        padding: 20, 
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    infoText: {
        fontSize: 18, 
        color: '#333',
        marginBottom: 10, 
    },
    infoLabel: {
        fontWeight: 'bold',
        color: '#000',
    },
});