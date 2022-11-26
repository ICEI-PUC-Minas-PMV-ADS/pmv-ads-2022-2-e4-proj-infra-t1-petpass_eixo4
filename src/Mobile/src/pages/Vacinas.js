import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { List, Text, FAB } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/ContainerMain';
import Body from '../components/Body';

import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { getVacinas } from '../services/vacinas.services';
import { useIsFocused } from '@react-navigation/native';

const Vacinas = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { name } = useUser();
  const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
    getVacinas().then((dados) => {
      setVacinas(dados);
    });
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <List.Item
      title={item.descricao}
      description={'Dose: ' + item.dose}
      left={(props) => (
        <List.Icon
          {...props}
          color="#949494"
          icon={item.tipoPet == 0 ? 'dog' : 'cat'}
        />
      )}
      onPress={() => navigation.navigate('CadastrarVacina', { item })}
    />
  );
  return (
    <Container>
      <Header title={'Vacinas'} />
      <Body>
        <FlatList
          data={vacinas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => navigation.navigate('CadastrarVacina')}
        />
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#0E1647',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Vacinas;
