import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import CadastrarPet from '../pages/CadastrarPet';
import Vacinas from '../pages/Vacinas';
import Pet from '../pages/Pet';
import CadastrarVacina from '../pages/CadastrarVacina';
import News from '../pages/News';
import ReadNews from '../pages/ReadNews';
import VacinasPet from '../pages/VacinasPet';
import RegistrarVacina from '../pages/RegistrarVacina';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="CadastrarPet"
        component={CadastrarPet}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Pet"
        component={Pet}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Vacinas"
        component={Vacinas}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="CadastrarVacina"
        component={CadastrarVacina}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ReadNews"
        component={ReadNews}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="VacinasPet"
        component={VacinasPet}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="RegistrarVacina"
        component={RegistrarVacina}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
