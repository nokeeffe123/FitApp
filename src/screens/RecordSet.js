// screens/MachineDetails.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Function to save data to AsyncStorage
const saveData = async (weight) => {
    console.log('Data saving called');
    try {
        await AsyncStorage.setItem('weight', weight);
        console.log('Data saved');
    } catch (error) {
        // Error saving data
    }
};

// Function to retrieve saved data from AsyncStorage
const retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('weight');
        if (value !== null) {
            // We have data!!
            console.log(value);
            return value;
        }
    } catch (error) {
        // Error retrieving data
    }
};

const MachineDetails = () => {
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Record you set</Text>
            <Text style={styles.label}>Enter weight:</Text>
            <TextInput
                label="Enter your name"
                value={weight}
                onChangeText={(text) => setWeight(text.replace(/[^0-9]/g, ''))}  // Updating the state
                style={styles.input}
                mode="outlined"
            />
            <Text style={styles.label}>Enter Reps:</Text>
            <TextInput
                keyboardType="numeric" // Ensures only numbers are entered
                value={reps}
                onChangeText={(text) => setReps(text.replace(/[^0-9]/g, ''))} // Allow only digits
                placeholder="Type a number"
                mode="outlined"
                style={styles.input}
            />
            <Button
                mode="contained"
                onPress={saveData(weight)}>
                Record Set
            </Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 23,
        color: 'black',
    },
    input: {
        marginVertical: 10,
        width: 300,
    },
    savedText: { marginTop: 20, fontSize: 16, fontWeight: 'bold' },
});

export default MachineDetails;