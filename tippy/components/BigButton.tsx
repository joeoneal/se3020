import React from 'react';
import { Pressable, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

type BigButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  onPress: () => void;
};

const BigButton = ({ title, onPress, disabled, style, textStyle }: BigButtonProps) => {
  return (
    <Pressable
      style={[styles.button, style, disabled && styles.disabledButton]} onPress={onPress} disabled={disabled} // Merges default style with your custom style
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0db6db',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: '700',
  },

  disabledButton: {
    backgroundColor: 'grey',
    opacity: 0.7,
  }
});

export default BigButton;