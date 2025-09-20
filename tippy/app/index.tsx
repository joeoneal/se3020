import { Text, View, StyleSheet, ScrollView } from "react-native";
import {useEffect, useState} from "react";
import { unlockAsync,addOrientationChangeListener,removeOrientationChangeListener, Orientation } from "expo-screen-orientation";
import InputField from "../components/InputFields"
import BigButton from "@/components/BigButton";
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Index() {

  const [bill, setBill] = useState('');
  const [tip, setTip] = useState(20);
  const [size, setSize] = useState('');

  const [orientation, setOrientation] = useState(Orientation.PORTRAIT_UP);
  const router = useRouter();

  const handlePress = () => {
    const billAmount = parseFloat(bill) ||0;
    const peopleCount = parseInt(size) || 1;
    const tipAmount = billAmount * (tip / 100);
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / peopleCount;
    router.push({
      pathname: '/summary',
      params: {
        bill_pass: billAmount,
        tip_pass: tip,
        total_tip_pass: tipAmount.toFixed(2),
        total_pass: totalAmount.toFixed(2),
        people_pass: peopleCount,
        perPerson_pass: perPerson.toFixed(2), // Format to 2 decimal places
      },
    });
  }
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

  return (
    <View style={styles.container}>

      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="calculator-variant" size={100} color="#0db6db" />
      </View>

      <View style={styles.formContainer}>

        <InputField
          label="Bill Amount"
          placeholder="Enter total bill"
          value={bill}
          onChangeText={setBill}
        />


        <Text style={styles.label}>Tip: {Math.round(tip)}%</Text>

    
        <Slider
          style={{ width: '80%', height: 40 }}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={tip}
          onValueChange={setTip}
          minimumTrackTintColor="#007AFF"
          maximumTrackTintColor="#d3d3d3"
        />

        {/* <InputField
          label="Tip Percentage"
          placeholder="eg. 20"
          value={tip}
          onChangeText={setTip}
        /> */}

        <InputField
          label="# of People"
          placeholder="Enter party size"
          value={size}
          onChangeText={setSize}
        />
       </View>

      <View style={styles.buttonContainer}>
      <BigButton
          title="View Summary"
          onPress={handlePress}
        />

      </View>


    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafbfc',
  },

  label: {
    fontSize: 16,
    color: '#333',
    alignSelf: 'flex-start',
    marginLeft: '10%', 
  },

  iconContainer: {
    paddingTop: 25,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
    width: '100%',
  },

  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 50,
    gap: 15,
    
  },

  buttonContainer: {
    backgroundColor: '#e3e6e8',
    width: '100%',       
    height: '100%',
    paddingTop: 50,         
    paddingBottom: 20,        
    alignItems: 'center',  
  }
})