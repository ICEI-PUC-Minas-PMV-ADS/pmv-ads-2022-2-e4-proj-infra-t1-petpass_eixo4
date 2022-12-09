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
import { useUser } from '../contexts/UserContext';
import { createPet, updatePet, deletePet, addUsuario } from '../services/pets.services';

const CadastrarPet = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params ? route.params : {};

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const { signed, setSigned, name, setName, userId, setUserId } = useUser();
  const [tipo, setTipo] = useState(null);
  const [nome, setNome] = useState(null);
  const [sexo, setSexo] = useState(null);
  const [raca, setRaca] = useState(null);
  const [pesoPet, setPesoPet] = useState('');
  const [dataRegistro, setDataRegistro] = useState(moment(new Date()).format('DD/MM/YYYY'));

  useEffect(() => {
    if (item) {
      setDataRegistro(moment(item.pet.dataRegistro).format('DD/MM/YYYY'));
      setNome(item.pet.nomePet);
      setTipo(item.pet.tipo == 0 ? 'dog' : 'cat');
      setSexo(item.pet.sexo == 0 ? 'macho' : 'femea');
      setPesoPet('' + item.pet.peso);
      setRaca(item.pet.raca);
    }
  }, [item]);

  const handleSalvar = () => {
    if (item) {
      updatePet({
        tipo: tipo == 'dog' ? 0 : 1,
        dataRegistro: moment(new Date(dataRegistro)).format('YYYY-MM-DD'),
        nomePet: nome,
        sexo: sexo == 'macho' ? 0 : 1,
        raca: raca,
        peso: pesoPet,
        id: item.petId,
      }).then((res) => {
        navigation.goBack();
      });
    } else {
      createPet({
        tipo: tipo == 'dog' ? 0 : 1,
        dataRegistro: moment(new Date(dataRegistro)).format('YYYY-MM-DD'),
        nomePet: nome,
        sexo: sexo == 'macho' ? 0 : 1,
        raca: raca,
        peso: pesoPet,
      }).then((res) => {
        addUsuario(
          res.id,          
        {
          petId: res.id,
          UsuarioId: userId,
        }
        ).then((resUser) => {
          navigation.goBack();
        });
      });
    };
  }

  const handleExcluir = () => {
    deletePet(item.petId).then((res) => {
      navigation.goBack();
    });
  };

  return (
    <Container>
      <Header title={'Cadastre seu Pet'} goBack={() => navigation.goBack()}>
        <Appbar.Action icon="check" onPress={handleSalvar} />
        {item && <Appbar.Action icon="trash-can" onPress={handleExcluir} />}
      </Header>
      <Body>
        <View style={styles.containerRadio}>
          <View style={styles.containerRadioItem}>
            <RadioButton
              value="tipo"
              status={tipo === 'dog' ? 'checked' : 'unchecked'}
              onPress={() => setTipo('dog')}
            />
            <Text>Cachorro</Text>
          </View>

          <View style={styles.containerRadioItem}>
            <RadioButton
              value="tipo"
              status={tipo === 'cat' ? 'checked' : 'unchecked'}
              onPress={() => setTipo('cat')}
            />
            <Text>Gato</Text>
          </View>
        </View>
        <View style={styles.containerRadio}>
          <View style={styles.containerRadioItem}>
            <RadioButton
              value="sexo"
              status={sexo === 'macho' ? 'checked' : 'unchecked'}
              onPress={() => setSexo('macho')}
            />
            <Text>Macho</Text>
          </View>

          <View style={styles.containerRadioItem}>
            <RadioButton
              value="sexo"
              status={sexo === 'femea' ? 'checked' : 'unchecked'}
              onPress={() => setSexo('femea')}
            />
            <Text>Fêmea</Text>
          </View>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShow(false)}
            onChange={(event, date) => {
              setShow(false);
              setDataRegistro(moment(new Date(date)).format('DD/MM/YYYY'));
            }}
          />
        )}
        <TouchableOpacity onPress={() => setShow(true)}>
          <Input
            label="Data"
            value={dataRegistro}
            editable={false}
          />
        </TouchableOpacity>
        <Input
          label="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <Input
          label="Raça"
          value={raca}
          onChangeText={(text) => setRaca(text)}
        />
        <Input
          label="Peso"
          value={'' + pesoPet}
          keyboardType='decimal-pad'
          onChangeText={(text) => setPesoPet(text)}
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
    marginTop: 16,
    marginBottom: 8,
  },
});

export default CadastrarPet;
