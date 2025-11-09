import React from 'react';
import { View, StyleSheet } from 'react-native';

export const SkeletonLoader = () => {
    return (
        <View style={styles.scrollContentContainer}> 
            <View style={styles.contentHeaderContainer}>
                <View style={[styles.image, styles.skeleton]} /> 
                <View style={[styles.skeleton, styles.skeletonTitle]} />
                <View style={[styles.skeleton, styles.skeletonSubtitle]} />
                <View style={[styles.infoBox, styles.skeleton]} />
            </View>
        </View>
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
    },
    infoBox: {
        width: '100%',
        padding: 20, 
        borderRadius: 8,
        height: 150, // Added explicit height for the skeleton box
    },
    skeleton: {
        backgroundColor: '#e0e0e0',
    },
    skeletonTitle: {
        height: 28, // Matches title fontSize
        width: '70%',
        borderRadius: 8,
        marginBottom: 8,
    },
    skeletonSubtitle: {
        height: 22, // Matches subtitle fontSize
        width: '50%',
        borderRadius: 8,
        marginBottom: 24,
    },
});

export default SkeletonLoader;