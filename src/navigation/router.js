import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen'; // Import your screen
import WorkoutOptions from '../screens/WorkoutOptions'; // Import your screen
import MachineDetails from '../screens/MachineDetails'; // Import your screen
import RecordSet from '../screens/RecordSet'; // Import your screen

import {
  PaperProvider
} from 'react-native-paper';


const Stack = createStackNavigator({
  screens: {
    Home: HomeScreen,
    WorkoutOptions: WorkoutOptions,
    MachineDetails: MachineDetails,
    RecordSet: RecordSet,
  },
});

const Router = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="WorkoutOptions" component={WorkoutOptions} />
          <Stack.Screen name="MachineDetails" component={MachineDetails} />
          <Stack.Screen name="RecordSet" component={RecordSet} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Router;