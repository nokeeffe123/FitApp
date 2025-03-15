// screens/HomeScreen.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {Text, Button} from 'react-native-paper';


const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.container]}>
      <Text variant="headlineLarge">Hello!</Text>
      <Button mode="contained" onPress={() => {
          const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
          navigation.navigate('WorkoutOptions', { date: today });
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
