import React, { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import CadastrarPet from './CadastrarPet';
import MeusPets from './MeusPets';
import Vacinas from './Vacinas';
import News from './News';

const Home = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'meusPets', title: 'Meus Pets', icon: 'dog' },
    { key: 'vacinas', title: 'Vacinas', icon: 'hospital' },
    { key: 'news', title: 'Notícias', icon: 'newspaper' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    meusPets: MeusPets,
    cadastrarPet: CadastrarPet,
    vacinas: Vacinas,
    news: News,
  });

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: '#0E1647' }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Home;
