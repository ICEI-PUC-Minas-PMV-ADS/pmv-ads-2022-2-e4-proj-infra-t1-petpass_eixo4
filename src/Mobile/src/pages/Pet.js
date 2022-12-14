import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';

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
  const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
      setData(item.pet.dataRegistro);
      setNome(item.pet.nomePet);
      setTipo(item.pet.tipo == 0 ? 'dog' : 'cat');
      setSexo(item.pet.sexo == 0 ? 'macho' : 'femea');
      setRaca(item.pet.raca);
      setPeso(item.pet.peso);
  }, [item]);

  return (
    <Container>
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
            <Paragraph>Registrado em: {moment(data).format('DD/MM/YYYY')}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button style={styles.button} onPress={()=>navigation.navigate('VacinasPet',{item})}>Ver vacinas</Button>
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
