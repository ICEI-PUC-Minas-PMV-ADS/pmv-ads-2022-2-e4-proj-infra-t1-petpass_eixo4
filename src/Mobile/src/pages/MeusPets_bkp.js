import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { List, Text, FAB } from 'react-native-paper';

import Header from '../components/Header';
import ContainerMain from '../components/ContainerMain';
import Body from '../components/Body';

import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { getPets } from '../services/pets.services';
import { useIsFocused } from '@react-navigation/native';

const MeusPets = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { name } = useUser();
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    getPets().then((dados) => {
      console.log(dados);
      setGastos(dados);
    });
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <List.Item
      title={item.nomePet}
      description={
        item.tipo==0?'Cachorro':'Gato'+
        "\nSexo: " + item.sexo+
        "\nPeso: " + item.peso
      }
      left={(props) => (
        <List.Icon
          {...props}
          color='#949494'
          icon={item.tipo==0?'dog':'cat'}
        />
      )}
      right={(props) => (
        <Text {...props} style={{ alignSelf: 'center' }}>
          {item.raca}{' '}
        </Text>
      )}
      onPress={() => navigation.navigate('CadastrarPet', { item })}
    />
  );
  return (
    <ContainerMain>
      <Header title={'Meus Pets'} />
      <Body>
        <FlatList
          data={gastos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Body>
    </ContainerMain>
  );
};

const styles = StyleSheet.create({
});

export default MeusPets;
