import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen'; // Import your screen
import NextPage from '../screens/NextPage'; // Import your screen
import MachineDetails from '../screens/MachineDetails'; // Import your screen
import RecordSet from '../screens/RecordSet'; // Import your screen

const Stack = createStackNavigator({
  screens: {
    Home: HomeScreen,
    NextPage: NextPage,
    MachineDetails: MachineDetails,
    RecordSet: RecordSet,
  },
});

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NextPage" component={NextPage} />
        <Stack.Screen name="MachineDetails" component={MachineDetails} />
        <Stack.Screen name="RecordSet" component={RecordSet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;