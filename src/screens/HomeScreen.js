// screens/HomeScreen.js
import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';


const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={[styles.text]}>Hello!</Text>
      <Button
        style={styles.button}
        title="Start Today's Session"
        onPress={() => {
          const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
          navigation.navigate('WorkoutOptions', { date: today });
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
  button: {
    backgroundColor: '#000', // Primary color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default HomeScreen;
