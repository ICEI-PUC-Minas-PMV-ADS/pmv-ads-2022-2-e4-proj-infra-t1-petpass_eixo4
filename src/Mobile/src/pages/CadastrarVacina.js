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

<<<<<<< HEAD
  const [tipoPet, setTipoPet] = useState(null);
=======
  const [tipoVacina, setTipoVacina] = useState(null);
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
  const [descricao, setDescricao] = useState(null);
  const [dose, setDose] = useState(null);

  useEffect(() => {
    if (item) {
<<<<<<< HEAD
      console.log('item',item);
      setDescricao(item.descricao);
      setTipoPet(item.tipoPet == 0 ? 'dog' : 'cat');
      console.log(tipoPet);
=======
      setDescricao(item.descricao);
      setTipoVacina(item.tipo == 0 ? 'dog' : 'cat');
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
      setDose(item.dose);
    }
  }, [item]);

  const handleSalvar = () => {
    if (item) {
      updateVacina({
<<<<<<< HEAD
        tipoPet: tipoPet == 'dog' ? 0 : 1,
=======
        tipoVacina: tipoVacina == 'dog' ? 0 : 1,
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
        descricao: descricao,
        dose: dose,
        id: item.id,
      }).then((res) => {
        navigation.goBack();
      });
    } else {
      createVacina({
<<<<<<< HEAD
        tipoPet: tipoPet == 'dog' ? 0 : 1,
=======
        tipoVacina: tipoVacina == 'dog' ? 0 : 1,
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
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
<<<<<<< HEAD
      <Header title={'Cadastro de Vacina'} goBack={() => navigation.goBack()}>
=======
      <Header title={'Cadastre seu Vacina'} goBack={() => navigation.goBack()}>
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
        <Appbar.Action icon="check" onPress={handleSalvar} />
        {item && <Appbar.Action icon="trash-can" onPress={handleExcluir} />}
      </Header>
      <Body>
        <View style={styles.containerRadio}>
          <View style={styles.containerRadioItem}>
            <RadioButton
<<<<<<< HEAD
              value={tipoPet}
              status={tipoPet == 'dog' ? 'checked' : 'unchecked'}
              onPress={() => setTipoPet('dog')}
=======
              value="tipo"
              status={tipoVacina === 'dog' ? 'checked' : 'unchecked'}
              onPress={() => setTipoVacina('dog')}
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
            />
            <Text>Cachorro</Text>
          </View>

          <View style={styles.containerRadioItem}>
            <RadioButton
<<<<<<< HEAD
              value={tipoPet}
              status={tipoPet == 'cat' ? 'checked' : 'unchecked'}
              onPress={() => setTipoPet('cat')}
=======
              value="tipo"
              status={tipoVacina === 'cat' ? 'checked' : 'unchecked'}
              onPress={() => setTipoVacina('cat')}
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
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
