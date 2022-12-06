import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './src/contexts/UserContext';
import Route from './src/navigations/Route';

<<<<<<< HEAD
import { LogBox } from "react-native";
const App = () => {
  LogBox.ignoreLogs(["EventEmitter.removeListener"]);
=======
import Register from './src/pages/Register';

const App = () => {
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
  return (
    <UserProvider>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </UserProvider>
  );
};
export default App;
