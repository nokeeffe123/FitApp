// screens/HomeScreen.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {Text, Button} from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const saveData = async (workout_session) => {
  console.log('Data saving called', workout_session);
  try {
      await AsyncStorage.setItem('workout_session', workout_session);
      console.log('Data saved', workout_session);
  } catch (error) {
      // Error saving data
  }
};

const HomeScreen = ({ navigation }) => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const workout_session = {id: "randome_uid", date: today, exercises: []};
  return (
    <SafeAreaView style={[styles.container]}>
      <Text variant="headlineLarge">Hello!</Text>
      <Button mode="contained" onPress={() => {
          saveData(workout_session);
          navigation.navigate('WorkoutOptions', { workout_session: workout_session});
        }}>
        Start Today's Session
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { marginVertical: 10 },
  card: { marginVertical: 10, padding: 10 },
});


export default HomeScreen;
