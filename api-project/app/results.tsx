import { View, StyleSheet, Text } from 'react-native'
import BackButton from '@/components/results/BackButton'

export default function Results() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>text here</Text>
            <BackButton style={styles.button}></BackButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        fontSize: 34,
        color: 'red',
        fontWeight: 'bold'

    },

    button: {

    }
})