import { View, Text, TextInput, StyleSheet } from 'react-native';

type inputProps = {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void; // onChangeText is a function
  };

const InputField = ({ label, placeholder, value, onChangeText }: inputProps) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric" // Use the numeric keyboard for these inputs
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: '80%',
      marginBottom: 20,
    },
    label: {
      fontSize: 24,
      marginBottom: 8,
      color: '#333',
    },
    input: {
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      fontSize: 18,
    },
  });
  
  export default InputField;