import React from 'react'
import { Pressable, Text, StyleSheet} from 'react-native'

type AddCrimeButtonProps = {
    onPress: () => void
}

const AddCrimeButton = ({onPress}: AddCrimeButtonProps) => {
    return (
    <Pressable onPress={onPress}>
        <Text style={styles.text}>+</Text>
    </Pressable>
    ) 
}

const styles = StyleSheet.create({
    text: {
      marginRight: 5, 
      fontSize: 34,
      color: 'white', 
      marginBottom: 5,
    },
  });
  
  export default AddCrimeButton;