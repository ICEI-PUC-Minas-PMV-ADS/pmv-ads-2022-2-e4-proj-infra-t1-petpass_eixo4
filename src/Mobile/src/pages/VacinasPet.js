import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { List, Text, FAB } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/ContainerMain';
import Body from '../components/Body';

import { useNavigation } from '@react-navigation/native';
import { getVacinasPet } from '../services/pets.services';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

const VacinasPet = ({ route }) => {
  const { item } = route.params ? route.params : {};
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getVacinasPet(item.pet.id).then((dados) => {
      setPets(dados);
    });
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <List.Item
      title={item.vacina.descricao}
      description={'Aplicada em ' + moment(item.data).format('DD/MM/YYYY')}
      right={(props) => (
        <Text {...props} style={{ alignSelf: 'center' }}>
          {'Idade: ' + item.idade + ' anos'}
        </Text>
      )}
      onPress={() => navigation.navigate('RegistrarVacina', { item })}
    />
  );
  return (
    <Container>
      <Header title={`Vacinas d${item.pet.sexo == 0 ? 'o' : 'a'} ${item.pet.nomePet}`} goBack={() => navigation.goBack()}/>
      <Body>
        <FlatList
          data={pets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => navigation.navigate('RegistrarVacina', { item })}
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

export default VacinasPet;
