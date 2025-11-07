import { Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native'

type props = {
    onPress: () => void;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>
}

export default function FilterButton({onPress, style, children}: props){
    return (
        <Pressable
            style={[styles.button, style]}
            onPress={onPress}
            children = {children}
        >   
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#F7FAFC', // Soft white
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
    }
})