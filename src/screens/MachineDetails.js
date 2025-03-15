// screens/MachineDetails.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

const MachineDetails = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineLarge">Machine Details</Text>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('RecordSet');
        }}>
        Record Set
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