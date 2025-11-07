import { Pressable, StyleSheet, StyleProp, ViewStyle, Alert, Text } from 'react-native'

const searchPress = () => {
    Alert.alert('search')
}

type props = {
    style?: StyleProp<ViewStyle>
}

export default function SearchButton({ style}: props) {
    return (
        <Pressable
            style = {[styles.button, style]}
            onPress={searchPress}
        >
        <Text style={styles.text}>Search</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#E53E3E', 
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    }
})