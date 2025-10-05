import React from 'react'
import { Pressable, StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

type SettingsCogProps = {
    onPress: () => void
}

const SettingsCog = ({onPress}: SettingsCogProps) => {
    return (
    <Pressable onPress={onPress}>
        <Ionicons 
            name="settings-outline" 
            size={24} 
            color="white" 
            style={styles.icon} 
        />
    </Pressable>
    ) 
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 15
      },
  });


  export default SettingsCog;