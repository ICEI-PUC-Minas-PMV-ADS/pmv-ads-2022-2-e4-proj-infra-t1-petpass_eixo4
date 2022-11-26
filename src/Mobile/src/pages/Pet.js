import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

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
  //const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
      setData(item.data);
      setNome(item.nomePet);
      setTipo(item.tipo == 0 ? 'dog' : 'cat');
      setSexo(item.sexo == 0 ? 'macho' : 'femea');
      setRaca(item.raca);
      setPeso(item.peso);
    
  }, [item]);

  return (
    <Container>
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
