import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type OnboardingHeaderProps = {
  isDarkMode: boolean;
};

export default function OnboardingHeader({ isDarkMode }: OnboardingHeaderProps) {
  const textStyle = [styles.baseText, isDarkMode ? styles.darkText : styles.lightText];
  const mutedTextStyle = [styles.subTitle, isDarkMode ? styles.darkMutedText : styles.lightMutedText];

  return (
    <>
      <Image
        source={require('../../assets/images/walking2.png')} 
        style={styles.image}
      />
      <Text style={[styles.welcomeTitle, textStyle]}>Welcome to ZenStep!</Text>
      <Text style={mutedTextStyle}>
        Connect with your daily movement and track your mood for a balanced, mindful life.
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%', 
    maxWidth: 400,
    height: 250,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20, 
    paddingHorizontal: 10, 
  },
  baseText: {}, 
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  lightMutedText: {
     color: '#555',
  },
  darkMutedText: {
    color: '#999',
  },
});