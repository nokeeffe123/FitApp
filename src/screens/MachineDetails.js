// screens/MachineDetails.js
import React from 'react';
import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';

const MachineDetails = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to the Details of the Machine Page!</Text>
      <Button
        title="Record Set"
        onPress={() => {
          navigation.navigate('RecordSet');
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