import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { List, Text, FAB } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/ContainerMain';
import Body from '../components/Body';

import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { getPets } from '../services/pets.services';
import { useIsFocused } from '@react-navigation/native';

const RegistroVacina = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { name } = useUser();
  const [pets, setPets] = useState([]);
  const [vacina, setVacina] = useState([]);

  useEffect(() => {
    getPets().then((dados) => {
      console.log(dados);
      setPets(dados);
    });
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <List.Item
      title={item.nomePet}
      description={
        'Peso: ' + item.peso
      }
      left={(props) => (
        <List.Icon
          {...props}
          color="#949494"
          icon={item.tipo == 0 ? 'dog' : 'cat'}
        />
      )}
      right={(props) => (
        <Text {...props} style={{ alignSelf: 'center' }}>
          {item.raca}{item.sexo == 0 ? ' macho' : ' femea'}
        </Text>
      )}
      onPress={() => navigation.navigate('CadastrarPet', { item })}
    />
  );
  return (
    <Container>
      <Header title={'Meus Pets'} />
      <Body>
        <FlatList
          data={pets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default RegistroVacina;
