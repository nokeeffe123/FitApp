// App.js
import React from 'react';
import Router from './src/navigation/router'; // Import Router
import {
  PaperProvider
} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
        <Router />
    </PaperProvider>
  ); // Use the Router component
};

export default App;