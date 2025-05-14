import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import { Text, Surface, Button, TextInput, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecordSet = ({ route, navigation }) => {
    const { workout_session, machineId, machineTitle } = route.params;
    const sessionKey = 'workout_session' + workout_session.date;
    const machineKey = `${machineTitle}_${machineId}`;
    const [sets, setSets] = useState([]);
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    // Helper: fetch only sets of this machine, from session
    const loadSets = async () => {
        try {
            const stored = await AsyncStorage.getItem(sessionKey);
            if (stored) {
                const session = JSON.parse(stored);
                if (session.machines && session.machines[machineKey]) {
                    setSets(session.machines[machineKey].sets || []);
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Ensure machine exists in session on mount
    useEffect(() => {
        const addMachineToSession = async () => {
            try {
                const stored = await AsyncStorage.getItem(sessionKey);
                let session = stored ? JSON.parse(stored) : { date: workout_session.date, machines: {} };
                if (!session.machines) session.machines = {};
                if (!session.machines[machineKey]) {
                    session.machines[machineKey] = {
                        machineId,
                        machineTitle,
                        sets: [],
                    };
                    await AsyncStorage.setItem(sessionKey, JSON.stringify(session));
                }
                loadSets();
            } catch (err) {
                console.error('❌ Error appending machine:', err);
            }
        };
        addMachineToSession();
        // eslint-disable-next-line
    }, []);

    // Correct grouping logic: get "setNumber" and "originalIndex" per date group
    function groupSetsByDate(sets) {
        const grouped = {};
        sets.forEach((set, originalIndex) => {
            const date = new Date(set.date).toLocaleDateString();
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push({ ...set, originalIndex }); // Keep original index for deletion
        });
        let result = [];
        Object.entries(grouped).forEach(([date, setsForDate]) => {
            result.push({ type: 'header', date });
            setsForDate.forEach((set, groupIndex) =>
                result.push({
                    type: 'item',
                    ...set,
                    setNumber: groupIndex + 1 // Always setNumber for display
                })
            );
        });
        return result;
    }
    const groupedSets = groupSetsByDate(sets);

    // Save set (only for this machine)
    const saveSet = async () => {
        if (!weight || !reps) return;
        const newSet = {
            weight,
            reps,
            date: new Date().toISOString(),
        };
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
            const updatedSets = [...(session.machines[machineKey].sets || []), newSet];
            session.machines[machineKey].sets = updatedSets;
            await AsyncStorage.setItem(sessionKey, JSON.stringify(session));
            setSets(updatedSets);
            setWeight('');
            setReps('');
        } catch (e) {
            console.error('Failed to save the sets.', e);
        }
    };

    // Delete a set from the list & storage
    const deleteSet = async (idx) => {
        try {
            const stored = await AsyncStorage.getItem(sessionKey);
            if (!stored) return;
            const session = JSON.parse(stored);
            if (!session.machines || !session.machines[machineKey]) return;
            let updatedSets = [...session.machines[machineKey].sets];
            updatedSets.splice(idx, 1);
            session.machines[machineKey].sets = updatedSets;
            await AsyncStorage.setItem(sessionKey, JSON.stringify(session));
            setSets(updatedSets);
        } catch (e) {
            console.error('Failed to delete set', e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Surface style={styles.section}>
                <Text style={styles.text}>Record your set</Text>
                <Text style={styles.label}>Enter weight:</Text>
                <TextInput
                    label="Enter weight"
                    value={weight}
                    onChangeText={(text) => setWeight(text.replace(/[^0-9]/g, ''))}
                    style={styles.input}
                    mode="outlined"
                />
                <Text style={styles.label}>Enter Reps:</Text>
                <TextInput
                    keyboardType="numeric"
                    value={reps}
                    onChangeText={(text) => setReps(text.replace(/[^0-9]/g, ''))}
                    placeholder="Enter no of reps"
                    mode="outlined"
                    style={styles.input}
                />
                <Button mode="contained" onPress={saveSet}>
                    Done
                </Button>
            </Surface>
            <View style={{ height: 24 }} />
            <FlatList
                data={groupedSets}
                extraData={sets}
                keyExtractor={(item, idx) =>
                    item.type === 'header'
                        ? `header-${item.date}-${idx}`
                        : `item-${item.date}-${item.setNumber}`
                }
                renderItem={({ item }) =>
                    item.type === 'header' ? (
                        <Text style={styles.sectionHeader}>{item.date}</Text>
                    ) : (
                        <View style={styles.row}>
                            <Text variant="titleMedium">
                                Set {item.setNumber} | Weight: {item.weight} kg • Reps: {item.reps}
                            </Text>
                            <IconButton
                                icon="delete"
                                size={20}
                                onPress={() => deleteSet(item.originalIndex)}
                            />
                        </View>
                    )
                }
                contentContainerStyle={{ paddingBottom: 30 }}
                refreshing={refreshing}
                onRefresh={async () => {
                    setRefreshing(true);
                    await loadSets();
                    setRefreshing(false);
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
    },
    section: {
        margin: 8,
        padding: 16,
        elevation: 4,
        borderRadius: 10,
        width: '95%',
        backgroundColor: '#fff',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 16,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    text: {
        fontSize: 23,
        color: 'black',
        marginBottom: 10,
    },
    input: {
        marginVertical: 10,
        width: 300,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    label: {
        marginTop: 5,
    },
});

export default RecordSet;