import { View, Text, ScrollView, StyleSheet, TextInput, Pressable, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import SaveButton from '@/components/SaveButton';
import { useCrimes } from "/Users/joeoneal/senior/se3020/se3020/crime-app/contexts/CrimeContext"
import { useLocalSearchParams } from 'expo-router';

interface Crime {
    id: string;
    title: string;
    description: string;
    date: Date;
    isSolved: boolean;
  }


export default function AddCrimeScreen() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    // date items below //
    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };
    // date items end //

    const [isSolved, setIsSolved] = useState(false)

    // crim shiz 

    const { crimes, addCrime } = useCrimes();
    const { id } = useLocalSearchParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            const existingCrime = crimes.find(crime => crime.id === id);
            if (existingCrime) {
                setTitle(existingCrime.title)
                setDescription(existingCrime.description)
                setDate(existingCrime.date)
                setIsSolved(existingCrime.isSolved)
            }
        }
    }, [id, crimes])

    const handleSaveCrime = () => {
        if (!title) {
            Alert.alert("Missing Title", "Please enter a title for the crime.");
            return;
        }

        addCrime({
            title: title,
            description: description,
            date: date,
            isSolved: isSolved,
          });
        
        setTitle('');
        setDescription('');
        setDate(new Date());
        setIsSolved(false);

        Alert.alert("Crime Saved", `"${title}" has been added to the list.`);    };
    

    return(
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
        >

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Please enter title'
                />
            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>Details</Text>
                <TextInput
                    style={[styles.input,styles.descriptionInput]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder='What happened?'
                    multiline={true}
                />
            </View>

            {/* date stuff below */}
            <View style={styles.dateContainer}>
                <Text style={styles.date}>Date</Text>
                    <TextInput
                        onPressIn={toggleDatePicker}
                        style={styles.input}
                        value={date.toDateString()}
                        editable={false} 
                    />
            </View>

            <View style={styles.spinner}>
            {showPicker && (
                <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChangeDate}
                />
            )}
            </View>

            {/* check box */}
            <View style={styles.checkBoxContainer}>
                <Checkbox
                    style={styles.checkbox}
                    value={isSolved}
                    onValueChange={setIsSolved}
                    color={isSolved ? '#4287f5' : undefined}
                />
                <Text style={styles.solved}>Solved?</Text>

            </View>

            {/* save button */}
            <View style={styles.button}>
                <SaveButton
                    onPress = {handleSaveCrime}
                />
            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {

    },

    titleContainer: {
        paddingTop: 10,
        paddingLeft: 150,
        paddingRight: 10,
        gap: 15,
    },
    title: {
        color: 'black',
        fontSize: 34,
        fontWeight: '700',
    },

    descriptionContainer: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        gap: 15,
    },
    description: {
        color: 'black',
        fontSize: 34,
        fontWeight: '700',

    },

    dateContainer: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        gap: 15
    },
    date: {
        alignItems: 'center',
        color: 'black',
        fontSize: 34,
        fontWeight: '700',
    },
    spinner: {
        alignItems: 'center'
    },

    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox : {
        marginRight: 8,
        marginLeft: 10,
        height: 25,
        width: 25,
    },
    solved: {
        fontSize: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f「9',
    },

    descriptionInput: {
        height: 120
    },

    button: {

    },
})