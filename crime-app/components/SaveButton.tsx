import React from 'react'
import { Pressable, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'

type SaveButtonProps = {
    onPress: () => void;
}

const SaveButton = ({ onPress}: SaveButtonProps) => {
    return(
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Save</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4287f5',
        alignItems: 'center',
        padding: 15,
    },

    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 700,

    }
})

export default SaveButton