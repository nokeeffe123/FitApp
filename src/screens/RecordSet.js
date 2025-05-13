// screens/MachineDetails.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import { Text, Surface, Button, TextInput, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const RecordSet = ({ route, navigation }) => {
    const { workout_session, machineId, machineTitle } = route.params;
    const [sessionData, setSessionData] = useState(null);
    const sessionKey = 'workout_session' + workout_session.date;
    const [sets, setSets] = useState([]);
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');

    const addMachineToSession = async (workout_session, machineId, machineTitle) => {
      const machineKey = `${machineTitle}_${machineId}`;

      try {
        const stored = await AsyncStorage.getItem(sessionKey);
        let session = stored ? JSON.parse(stored) : { date: workout_session.date, machines: {} };

        if (!session.machines) session.machines = {};

        // Avoid overwriting if already exists
        if (!session.machines[machineKey]) {
          session.machines[machineKey] = {
            machineId,
            machineTitle,
            sets: [],
          };

          await AsyncStorage.setItem(sessionKey, JSON.stringify(session));
          console.log('✅ Machine added:', session.machines[machineKey]);
        } else {
          console.log('ℹ️ Machine already exists in session');
        }
      } catch (err) {
        console.error('❌ Error appending machine:', err);
      }
    };

    useEffect(() => {
      addMachineToSession(workout_session, route.params.machineId, route.params.machineTitle);
    }, []);
    // Load sets from storage on mount

    const saveSet = async () => {
        if (!weight || !reps) return; // Prevent empty inputs

        const newSet = { weight, reps }; // Create set object
        const sessionKey = 'workout_session' + workout_session.date;
        const machineKey = `${machineTitle}_${machineId}`;

        try {
            const stored = await AsyncStorage.getItem(sessionKey);
            if (!stored) {
                  console.error('Session not found');
                  return;
            }
            const session = JSON.parse(stored);
            if (!session.machines || !session.machines[machineKey]) {
                  console.error('Machine not found in session');
                  return;
            }
            // Update sets for this machine
            const updatedSets = [...(session.machines[machineKey].sets || []), newSet];
            session.machines[machineKey].sets = updatedSets;
            await AsyncStorage.setItem(sessionKey, JSON.stringify(session));
            console.log('✅ Set saved:', newSet);
            // Update local UI state
            setSets(updatedSets);
            setWeight('');
            setReps('');
        } catch (e) {
            console.error('Failed to save the sets.', e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Surface style={styles.section}>
                <Text style={styles.text}>Record you set</Text>
                <Text style={styles.label}>Enter weight:</Text>
                <TextInput
                    label="Enter weight"
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
                    placeholder="Enter no of reps"
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