// screens/MachineDetails.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
// Function to save data to AsyncStorage
const saveData = async (machine_params) => {
  try {
      await AsyncStorage.setItem('workout_session'+workout_session.date, machine_params);
      console.log('Data saved', workout_session);
  } catch (error) {
      // Error saving data
  }
};

const recordMetaSet = (machine_params) => {
  console.log('Recording meta set', machine_params);
  exercises = [];
  exercises.push({
    id: machine_params.machineId,
    title: machine_params.machineTitle,
  }); // Add an empty exercise object
}
const MachineDetails = ({ route, navigation }) => {
  const machine_params = route.params || {};
  console.log('Machine Details', machine_params);
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineLarge">Machine Details</Text>
      <Button
        mode="contained"
        onPress={() => {
          recordMetaSet(machine_params);
          navigation.navigate('RecordSet');
        }}>
        Start Set
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          saveData(machine_params);
        }}>
        Save Session
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
    fontSize: 24,
    color: 'black',
  },
});

export default MachineDetails;