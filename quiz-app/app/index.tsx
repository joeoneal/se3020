import { Text, View, Pressable, Button, StyleSheet,  } from "react-native";
import QuizButton from '../components/QuizButton';

import { FontAwesome } from '@expo/vector-icons';

const questions = [{question: "The capital of New York is New York City.", answer: false}, 
                   {question: "The capital of Illinois is Chicago.", answer: false}, 
                   {question: "The capital of Oregon is Salem.", answer: true},
                   {question: "The capital of Pennsylvania is Philadelphia.", answer: false},
                   {question: "The capital of Ohio is Columbus.", answer: true},
                   {question: "The capital of California is Sacramento.", answer: true},
                   {question: "The capital of Washington is Olympia.", answer: true},
                   {question: "The capital of North Dakota is Bismarck.", answer: true},
                   {question: "The capital of Kentucky is Louisville.", answer: false},
                   {question: "The capital of Missouri is Jefferson City.", answer: true},
                  ]

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>test question</Text>

      <View style={[styles.buttonRow, {marginBottom: 40}]}>
        <QuizButton onPress={() => alert('true pressed')}>
          <Text style={styles.buttonText}>TRUE</Text>
        </QuizButton>
        <QuizButton onPress={() => alert('false pressed')}>
          <Text style={styles.buttonText}>FALSE</Text>
        </QuizButton>
      </View>

      <View style={styles.buttonRow}>
        <QuizButton onPress={() => alert('prev clicked')}>
          <FontAwesome name="play" size={18} color="white" style={{ transform: [{ rotate: '180deg' }] }}></FontAwesome>
          <Text style={styles.buttonText}>PREV</Text>
        </QuizButton>

        <QuizButton onPress={() => alert('next clicked')}>
          <Text style={styles.buttonText}>NEXT</Text>
          <FontAwesome name='play' size={18} color='white'></FontAwesome>
        </QuizButton>
      </View>

      <View>
        <Button title="CHEAT" color='red'></Button>
      </View>

    </View>

 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  questionText: {
    fontSize: 22,
    paddingBottom: 20,

  },
  
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 800,
}
});