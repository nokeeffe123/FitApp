// screens/WorkoutOptions.js
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { List, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


const workoutOptionsList = [
  { id: 1, title: 'Lat Pulldown', description: 'back muscles' },
  { id: 2, title: 'Leg Press', description: 'quadriceps, hamstrings, and glutes' },
  { id: 3, title: 'Butterfly Machine', description: 'chest muscles (pectorals)' },
];

const WorkoutOptions = ({ route, navigation }) => {
  const { workout_session } = route.params || {};
  const sessionKey = 'workout_session' + workout_session.date;
  const [selectedId, setSelectedId] = useState();
  const [machines, setMachines] = useState(null);

  const handleItemPress = (item) => {
    setSelectedId(item.id); // Update selectedId state
    navigation.navigate('RecordSet', { machineId: item.id, machineTitle: item.title, workout_session }); // Navigate to RecordSet
  };

  useEffect(() => {
      const fetchData = async () => {
          const savedSession = await AsyncStorage.getItem(sessionKey);
          if (savedSession) {
              const parsedSession = JSON.parse(savedSession);
              console.log("workout set", parsedSession.machines); // Use the data as needed
              setMachines(parsedSession.machines || {});
          }
      };

      fetchData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>Today's {workout_session.date} Session </Text>
        {workoutOptionsList.map((item) => {
            const machineKey = `${item.title}_${item.id}`;
            const machine = machines?.[machineKey];
            const setsCount = machine?.sets?.length || 0;

            return (
              <List.Item
                key={item.id}
                title={item.title}
                description={setsCount > 0 ? `${setsCount} sets recorded` : 'No sets yet'}
                onPress={() => handleItemPress(item)}
                left={props => <List.Icon {...props} icon="star" />}
                right={() => <Text>Go</Text>}
                style={styles.listItem}
              />
            );
        })}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    padding: 10,
    backgroundColor: '#fff', // White background
  },
  listItem: {
    backgroundColor: '#f0f0f0', // Light gray background
    borderRadius: 10, // Rounded corners
    marginVertical: 5, // Space between items
    padding: 10, // Inner padding
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333' // Darker text
  },
  description: {
    fontSize: 14,
    color: '#666' // Lighter gray for description
  },
});

export default WorkoutOptions;
