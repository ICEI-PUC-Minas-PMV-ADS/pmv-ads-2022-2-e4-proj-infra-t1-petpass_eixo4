import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  RadioButton,
  Text,
  TextInput,
  Button,
  Appbar,
} from 'react-native-paper';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import Header from '../components/Header';
import Container from '../components/ContainerMain';
import Body from '../components/Body';
import Input from '../components/Input';

import { useNavigation } from '@react-navigation/native';

import { createVacina, updateVacina, deleteVacina } from '../services/vacinas.services';

const CadastrarVacina = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params ? route.params : {};

  const [tipoPet, setTipoPet] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [dose, setDose] = useState(null);

  useEffect(() => {
    if (item) {
      console.log('item',item);
      setDescricao(item.descricao);
      setTipoPet(item.tipoPet == 0 ? 'dog' : 'cat');
      console.log(tipoPet);
      setDose(item.dose);
    }
  }, [item]);

  const handleSalvar = () => {
    if (item) {
      updateVacina({
        tipoPet: tipoPet == 'dog' ? 0 : 1,
        descricao: descricao,
        dose: dose,
        id: item.id,
      }).then((res) => {
        navigation.goBack();
      });
    } else {
      createVacina({
        tipoPet: tipoPet == 'dog' ? 0 : 1,
        descricao: descricao,
        dose: dose,
      }).then((res) => {
        navigation.goBack();
      });
    }
  };

  const handleExcluir = () => {
    deleteVacina(item.id).then((res) => {
      navigation.goBack();
    });
  };

  return (
    <Container>
      <Header title={'Cadastro de Vacina'} goBack={() => navigation.goBack()}>
        <Appbar.Action icon="check" onPress={handleSalvar} />
        {item && <Appbar.Action icon="trash-can" onPress={handleExcluir} />}
      </Header>
      <Body>
        <View style={styles.containerRadio}>
          <View style={styles.containerRadioItem}>
            <RadioButton
              value={tipoPet}
              status={tipoPet == 'dog' ? 'checked' : 'unchecked'}
              onPress={() => setTipoPet('dog')}
            />
            <Text>Cachorro</Text>
          </View>

          <View style={styles.containerRadioItem}>
            <RadioButton
              value={tipoPet}
              status={tipoPet == 'cat' ? 'checked' : 'unchecked'}
              onPress={() => setTipoPet('cat')}
            />
            <Text>Gato</Text>
          </View>
        </View>

        <Input
          label="Decrição"
          value={descricao}
          onChangeText={(text) => setDescricao(text)}
        />

        <Input
          label="Dose"
          value={dose}
          onChangeText={(text) => setDose(text)}
        />

        <Button mode="contained" style={styles.button} onPress={handleSalvar}>
          Salvar
        </Button>

        {item && (
          <Button
            mode="contained"
            color={'red'}
            style={styles.button}
            onPress={handleExcluir}>
            Excluir
          </Button>
        )}
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerRadio: {
    flexDirection: 'row',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  containerRadioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#0E1647',
    marginTop:16,
    marginBottom: 8,
  },
});

export default CadastrarVacina;
