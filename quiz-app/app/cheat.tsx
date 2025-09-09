import { View, Text, StyleSheet } from 'react-native';
import QuizButton from '../components/QuizButton';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';


export default function CheatScreen() {
  const { answer } = useLocalSearchParams()
  const [isShown, setShown] = useState(false)
  let answerText;
  if (answer === 'true') {
    answerText = 'TRUE';
  } else {
    answerText = 'FALSE';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure you want to do this?</Text>

      <View style={styles.buttonContainer}>
        {isShown ? (
          <Text style={styles.title}>
            The correct answer is {answerText}
          </Text>
        ) : (
          <QuizButton onPress={() => setShown(true)}>
            <Text style={styles.buttonText}>SHOW ANSWER</Text>
          </QuizButton>
        )}

      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(211, 211, 211)'
  },

  title: {
    fontSize: 18,
    marginTop: 55,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
},

  buttonContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  }
});