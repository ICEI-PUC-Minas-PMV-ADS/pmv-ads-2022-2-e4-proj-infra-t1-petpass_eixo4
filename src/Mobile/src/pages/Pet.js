import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
<<<<<<< HEAD
import moment from 'moment';
=======
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069

import Header from '../components/Header';
import Container from '../components/ContainerMain';
import Body from '../components/Body';
import getVacinasPet from '../services/pets.services';

import { useNavigation } from '@react-navigation/native';

const Pet = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;

  const [tipo, setTipo] = useState(null);
  const [nome, setNome] = useState(null);
  const [sexo, setSexo] = useState(null);
  const [raca, setRaca] = useState(null);
  const [peso, setPeso] = useState(null);
  const [data, setData] = useState(null);
<<<<<<< HEAD
  const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
    console.log(item);
      setData(moment(new Date(item.dataRegistro)).format('DD/MM/YYYY'));
=======
  //const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
      setData(item.data);
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
      setNome(item.nomePet);
      setTipo(item.tipo == 0 ? 'dog' : 'cat');
      setSexo(item.sexo == 0 ? 'macho' : 'femea');
      setRaca(item.raca);
      setPeso(item.peso);
<<<<<<< HEAD
=======
    
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
  }, [item]);

  return (
    <Container>
<<<<<<< HEAD
      <Header title={'Meu Pet'} goBack={() => navigation.goBack()}/>
      <Body>
        <Card>
          <Card.Title
            title={nome}
            subtitle={tipo === 'dog' ? 'Cachorro' : 'Gato'}
          />
          <Card.Content>
            <Title>
              {raca} {sexo == 'macho' ? 'macho' : 'fêmea'}
            </Title>
            <Card.Cover source={{ uri: 'https://picsum.photos/images' }} />
            <Paragraph>Peso: {peso}</Paragraph>
            <Paragraph>Registrado em: {moment(new Date(data)).format('DD/MM/YYYY')}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button style={styles.button} onPress={()=>navigation.navigate('VacinasPet',{item})}>Ver vacinas</Button>
=======
      <Header title={'Meu Pet'} goBack={() => navigation.goBack()}></Header>
      <Body>
        <Card>
          <Card.Title
            title={item.nomePet}
            subtitle={item.tipo === 'dog' ? 'Cachorro' : 'Gato'}
          />
          <Card.Content>
            <Title>
              {item.raca} {item.sexo == 'macho' ? 'macho' : 'fêmea'}
            </Title>
            <Card.Cover source={{ uri: 'https://picsum.photos/images' }} />
            <Paragraph>Peso: {item.peso}</Paragraph>
            <Paragraph>Registrado em: {item.data}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button style={styles.button}>Registrar Vacina</Button>
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
          </Card.Actions>
        </Card>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    textColor: '#ffffff',

    marginTop: 16,
    marginBottom: 8,
  },
});

export default Pet;
