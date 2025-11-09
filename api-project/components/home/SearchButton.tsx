import { Pressable, StyleSheet, StyleProp, ViewStyle, Alert, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

type props = {
    style?: StyleProp<ViewStyle>
    onPress: () => void
}

export default function SearchButton({ style, onPress }: props) {
    return (
        <Pressable
            style = {[style]}
            onPress={onPress}
        >
            <LinearGradient
                colors={['#AECFFF', '#007AFF']}
                style={styles.button} 
            >
                <Text style={styles.text}>Search</Text>
            </LinearGradient>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(52, 120, 246, 0.8)', 
        paddingVertical: 20, 
        paddingHorizontal: 20,
        borderRadius: 14, 
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 50, 
    }
})

