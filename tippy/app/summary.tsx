import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import BigButton from "@/components/BigButton";
import { useRouter } from 'expo-router';



export default function SummaryScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>

        <View style={styles.summary}>
            <Text style={styles.text}>
                For a bill of ${params.bill_pass} with {params.tip_pass}% tip, each of the {params.people_pass} people owes ${params.perPerson_pass}.
            </Text>    
        </View>

        <View style={styles.bottom_container}>
            <Text style = {styles.text2}>
                Total tip: ${params.total_tip_pass}
            </Text>

            <Text style = {styles.text2}>
                Total bill: ${params.total_pass}
            </Text>
        

            <BigButton
            title="Back"
            onPress={() => router.back()}
            />

        </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "white"
  },
  
  text: {
    fontSize: 40,
    textAlign: 'center',
  },

  text2: {
    fontSize: 24,
  },

  summary: {
    width: '90%',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 100,
    
  },

  bottom_container: {
    paddingTop: 25,
    flex: 1,
    width: '100%',
    gap: 50,
    backgroundColor: '#e3e6e8',
    alignItems: 'center'
  },


});