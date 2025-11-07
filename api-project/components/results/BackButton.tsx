import { Pressable, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native'
import {useRouter} from 'expo-router'

type props = {
    style?: StyleProp<ViewStyle>
}

export default function BackButton({style}: props) {
    const router = useRouter()
    return (
        <Pressable
            style = {[styles.button, style]}
            onPress={() => router.back()}
        >
            <Text style={styles.text}>Back</Text>
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