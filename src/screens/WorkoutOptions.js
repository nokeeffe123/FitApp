// screens/WorkoutOptions.js
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { List, Text } from 'react-native-paper';

const workoutOptionsList = [
  { id: 1, title: 'Lat Pulldown', description: 'back muscles' },
  { id: 2, title: 'Leg Press', description: 'quadriceps, hamstrings, and glutes' },
  { id: 3, title: 'Butterfly Machine', description: 'chest muscles (pectorals)' },
];

const WorkoutOptions = ({ route, navigation }) => {
  const { date } = route.params || {};
  const [selectedId, setSelectedId] = useState();

  const handleItemPress = (item) => {
    setSelectedId(item.id); // Update selectedId state
    navigation.navigate('MachineDetails', { itemId: item.id, itemTitle: item.title }); // Navigate to MachineDetails
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <Text variant="headlineLarge">Workout Options</Text> */}
        <Text>Today's {date} sessoin </Text>
        {workoutOptionsList.map((item) => (
          <List.Item
            key={item.id}  // Unique key required for lists
            title={item.title}
            description={item.description}
            onPress={() => handleItemPress(item)}
            left={props => <List.Icon {...props} icon="star" />} // Dumbbell icon
            right={() => (
              <Text>Go</Text>
            )}
            style={styles.listItem}
          />
        ))}
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
