// screens/MachineDetails.js
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const MachineDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to the Details of the Machine Page!</Text>
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