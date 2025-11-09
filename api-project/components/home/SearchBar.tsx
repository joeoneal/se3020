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
        height: 60, 
        backgroundColor: '#FFFFFF', 
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        borderRadius: 14, 
        width: '100%', 
        paddingHorizontal: 15,
        fontSize: 20, 
        color: '#1C1C1E', 
    }
})