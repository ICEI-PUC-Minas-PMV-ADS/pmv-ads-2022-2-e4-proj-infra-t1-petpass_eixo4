import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { List, Text, FAB, Appbar } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/ContainerMain';
import Body from '../components/Body';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { getPets } from '../services/pets.services';
import { GetPetsUsuario, logout } from '../services/auth.services';
import { useIsFocused } from '@react-navigation/native';


const MeusPets = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { id, setSigned,setId } = useUser();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    setId(AsyncStorage.getItem('@USER_ID'));

    
    GetPetsUsuario(id).then((dados) => {
      console.log('Meus pets - id: ', id);
      console.log('dados: ', dados);
      setPets(dados);
    });
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <List.Item
      title={item.nomePet}
      description={'Peso: ' + item.peso}
      left={(props) => (
        <List.Icon
          {...props}
          color="#949494"
          icon={item.tipo == 0 ? 'dog' : 'cat'}
        />
      )}
      right={(props) => (
        <Text {...props} style={{ alignSelf: 'center' }}>
          {item.raca}
          {item.sexo == 0 ? ' macho' : ' femea'}
        </Text>
      )}
      onLongPress={() => navigation.navigate('CadastrarPet', { item })}
      onPress={() => navigation.navigate('Pet', { item })}
    />
  );
  const handleLogout = () => {
    logout().then(res => {
      setSigned(false);
      AsyncStorage.setItem('@TOKEN_KEY', '').then();
    });
  }

  return (
    <Container>
      <Header title={'Meus Pets'} >
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Header>
      <Body>
        <FlatList
          data={pets}
          renderItem={renderItem}
          keyExtractor={(item) => item.petId}
        />
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => navigation.navigate('CadastrarPet')}
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

export default MeusPets;
