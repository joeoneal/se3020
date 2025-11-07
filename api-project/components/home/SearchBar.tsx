import {TextInput, StyleSheet } from 'react-native'

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText}: SearchBarProps) {
    return (
        <TextInput
            style={styles.search}
            placeholder={'Search for music...'}
            value={value}
            onChangeText={onChangeText}
        />
    )
}

const styles = StyleSheet.create({
    search: {
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        width: '90%'
    }
})