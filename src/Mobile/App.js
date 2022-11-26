import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './src/contexts/UserContext';
import Route from './src/navigations/Route';

import { LogBox } from "react-native";
const App = () => {
  LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  return (
    <UserProvider>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </UserProvider>
  );
};
export default App;
