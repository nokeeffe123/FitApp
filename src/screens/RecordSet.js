// screens/MachineDetails.js
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, Button } from 'react-native';

const MachineDetails = () => {
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Record you set</Text>
            <Text style={styles.label}>Enter weight:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric" // Ensures only numbers are entered
                value={weight}
                onChangeText={(text) => setWeight(text.replace(/[^0-9]/g, ''))} // Allow only digits
                placeholder="Type a number"
            />
            <Text style={styles.label}>Enter Reps:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric" // Ensures only numbers are entered
                value={reps}
                onChangeText={(text) => setReps(text.replace(/[^0-9]/g, ''))} // Allow only digits
                placeholder="Type a number"
            />
            <Button
                title="Record"
                onPress={() => {
                    console.log(`Weight: ${weight} Reps: ${reps}`);
                }}
            />
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
        fontSize: 24,
        color: 'black',
    },
});

export default MachineDetails;