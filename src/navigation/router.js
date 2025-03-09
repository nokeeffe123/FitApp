import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen'; // Import your screen
import NextPage from '../screens/NextPage'; // Import your screen
import MachineDetails from '../screens/MachineDetails'; // Import your screen

const Stack = createStackNavigator({
  screens: {
    Home: HomeScreen,
    NextPage: NextPage,
    MachineDetails: MachineDetails,
  },
});

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NextPage" component={NextPage} />
        <Stack.Screen name="MachineDetails" component={MachineDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;