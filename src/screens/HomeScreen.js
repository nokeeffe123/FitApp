// screens/HomeScreen.js
import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hello!</Text>
      <Button
        title="Start Today's Session"
        onPress={() => {
          const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
          navigation.navigate('NextPage', { date: today });
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

export default HomeScreen;
