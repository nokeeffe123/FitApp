// screens/MachineDetails.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import { Text, Surface, Button, TextInput, Card } from 'react-native-paper';

const RecordSet = ({ route, navigation }) => {
    const workout_session = route.params.workout_session || {};
    const [sets, setSets] = useState([]);
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');

    const saveSet = () => {
        if (!weight || !reps) return; // Prevent empty inputs

        const newSet = { weight, reps }; // Create set object
        setSets([...sets, newSet]); // Add new set to list
        setWeight(''); // Reset input
        setReps('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Surface style={styles.section}>
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
                    onPress={saveSet}>
                    Done
                </Button>
            </Surface>
            <FlatList
                data={sets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.row}>
                        <Text variant="titleMedium">Set {index + 1} </Text>
                        <Text variant="titleMedium">Weight: {item.weight} kg </Text>
                        <Text variant="titleMedium">Reps: {item.reps} </Text>
                    </View>
                )}
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
        width: '100%',
    },
    section: {
        flex: 1, // Equal sections
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        padding: 16,
        elevation: 4, // Paper shadow effect
        borderRadius: 10,
        width: '100%',
    },
    text: {
        fontSize: 23,
        color: 'black',
    },
    input: {
        marginVertical: 10,
        width: 300,
    },
    card: {
        width: '100%', // Makes the card take full width
        marginVertical: 5,
        padding: 10,
        backgroundColor: 'white',
        elevation: 3,
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row', // Aligns items in a row
        justifyContent: 'space-between', // Pushes items apart
        marginTop: 5,
    },
});

export default RecordSet;