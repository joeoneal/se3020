import { Pressable, Text, StyleSheet, Alert, StyleProp, ViewStyle } from 'react-native'

type QuizButtonProps = {
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
};

const QuizButton = ({ onPress, style, children }: QuizButtonProps) => {
    return (
        <Pressable style={[styles.button, style]} onPress = {onPress}>
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        marginHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    }
})

export default QuizButton;