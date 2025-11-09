import { Pressable, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native'

type props = {
    onPress: () => void;
    title: string
    style?: StyleProp<ViewStyle>
    isActive: boolean
}

export default function FilterButton({onPress, style, isActive, title}: props){
    return (
        <Pressable
            style={[styles.button, isActive && styles.active, style]}
            onPress={onPress}
        > 
            <Text
                style = {[styles.text, isActive && styles.activeText]}
            >
                {title}
            </Text>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF', 
        paddingVertical: 18, 
        paddingHorizontal: 20,
        borderRadius: 14, 
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    active: {
        backgroundColor: '#007AFF', 
        borderColor: '#007AFF',
        transform: [{ scale: 1.05}]
    },
    text: {
      color: '#1C1C1E', 
      fontWeight: '600', 
      fontSize: 18,
    },
    activeText: {
        color: 'white', 
        fontWeight: 'bold',
    }
})