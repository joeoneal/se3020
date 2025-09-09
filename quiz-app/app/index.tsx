import { Text, View, Button, StyleSheet } from "react-native";
import {useEffect, useState} from "react";
import QuizButton from '../components/QuizButton';
import { FontAwesome } from '@expo/vector-icons';
import { unlockAsync,addOrientationChangeListener,removeOrientationChangeListener, Orientation } from "expo-screen-orientation";
import { Link } from 'expo-router';

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

  const [orientation, setOrientation] = useState(Orientation.PORTRAIT_UP);

  useEffect(() => {
    console.log("Component mounted");
    unlockAsync();

    const subscription = addOrientationChangeListener((event) => {
      console.log(event)
      console.log("Orientation changed");
      setOrientation(event.orientationInfo.orientation);

    });

    return () => {
      console.log("Component unmounted");
      removeOrientationChangeListener(subscription);
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % questions.length)
  }

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + questions.length) % questions.length)
  }

  const checkAnswer = (userAnswer: boolean) => {
    const correctAnswer = questions[currentIndex].answer
    if (userAnswer === correctAnswer) {
      alert("You got it right!")
    } else {
      alert("I'm sorry, that was incorrect.")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        {questions[currentIndex].question}
      </Text>

      <View style={[styles.buttonRow, {marginBottom: 40}]}>
        <QuizButton onPress={() => checkAnswer(true)}>
          <Text style={styles.buttonText}>TRUE</Text>
        </QuizButton>
        <QuizButton onPress={() => checkAnswer(false)}>
          <Text style={styles.buttonText}>FALSE</Text>
        </QuizButton>
      </View>

      <View style={styles.buttonRow}>
        <QuizButton onPress={handlePrev}>
          <FontAwesome name="play" size={18} color="white" style={{ transform: [{ rotate: '180deg' }] }}></FontAwesome>
          <Text style={styles.buttonText}>PREV</Text>
        </QuizButton>

        <QuizButton onPress={handleNext}>
          <Text style={styles.buttonText}>NEXT</Text>
          <FontAwesome name='play' size={18} color='white'></FontAwesome>
        </QuizButton>
      </View>

      <Link href={{
        pathname: "/cheat",
        params: { answer: questions[currentIndex].answer.toString()}
      }} 
      asChild>
        <Button title="CHEAT" color='red' ></Button>
      </Link>

    </View>

 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(211, 211, 211)'
  },

  questionText: {
    fontSize: 22,
    paddingBottom: 20,
    textAlign: 'center',

  },
  
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
}
});