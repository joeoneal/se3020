import { Text, View, Pressable, Button  } from "react-native";

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 50
      }}
    >
      <Text
        style={{fontSize: 22, paddingBottom: 15}}>
        test question ????
        
      </Text>

      <View style={{flexDirection: "row"}}>

      <Pressable 
          style={{
            backgroundColor: "red",
            borderWidth: 10,
            borderColor: "red",
            borderRadius: 3,
          }} 
          onPress={() => alert('True has been clicked')}
          >
          <Text> True</Text>
        </Pressable>

        <Pressable 
          style={{
            backgroundColor: "red",
            borderWidth: 10,
            borderColor: "red",
            borderRadius: 3,
          }} 
          onPress={() => alert('False has been clicked')}
          >
          <Text> False</Text>
        </Pressable>

      </View>

      <View style={{flexDirection: "row"}}>
        <Button title="◀ PREV"/>
        <Button title="NEXT ▶"/>
      </View>

      <View>
        <Button title="CHEAT"></Button>
      </View>

    </View>

 
  );
}
