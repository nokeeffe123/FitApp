// screens/MachineDetails.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

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
                onPress={() => {
                    console.log(`Weight: ${weight} Reps: ${reps}`);
                }}>
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
});

export default MachineDetails;