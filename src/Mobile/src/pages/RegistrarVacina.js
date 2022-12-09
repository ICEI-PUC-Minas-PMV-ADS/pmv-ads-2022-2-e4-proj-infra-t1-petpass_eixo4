import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  RadioButton,
  Text,
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
import { useIsFocused } from '@react-navigation/native';

import { deleteVacina, addVacina, updateVacina } from '../services/pets.services';
import { getVacinas } from '../services/vacinas.services';

const RegistrarVacina = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params ? route.params : {};
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [descricao, setDescricao] = useState('');
  const [idade, setIdade] = useState('');
  const [data, setData] = useState('');
  const [vacinasList, setVacinasList] = useState([]);
  const [vacinaId, setVacinaId] = useState('');
  const [petId, setPetId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [nova, setNova] = useState('');
  const [tipoPet, setTipoPet] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (item.pet) { 
      newVacina(item.pet);
    } else { 
      editVacina(item);
    }
    getVacinasList(tipoPet);
  }, [isFocused]);

  const newVacina = (item) =>{
    setTipoPet(item.tipo);
    setNova('Add');
    setTitulo(`Vacinar ${item.nomePet}`);
    setPetId(item.id);
  };

  const editVacina = (item) =>{
    setTipoPet(item.vacina.tipoPet);
    setNova('Edit');
    setTitulo('Editar vacina');
    setDescricao(item.descricao);
    setData(moment((item.data)).format('DD/MM/YYYY'));
    setIdade(item.idade);
    setPetId(item.petId);
    setVacinaId(item.vacinaId);
  };


  const getVacinasList = (tipoPet) => {
    getVacinas().then((dados) => {
      if (tipoPet != null || tipoPet == '' || tipoPet == []) {
        let dadosFiltrados = dados.filter(x => x.tipoPet == tipoPet);
        setVacinasList(dadosFiltrados);
      } else {
        setVacinasList(dados);
      }
    }
    );
  }

  const handleSalvar = () => {
    if (nova === 'Edit') {
      let dateSplit = data.split("/");
      let dateToSave=dateSplit[2]+'-'+dateSplit[1]+'-'+dateSplit[0]
      updateVacina({
        vacinaId: vacinaId,
        data: dateToSave,
        petId: petId,
        idade: idade,
        id: item.id,
      }).then((res) => {
        navigation.goBack();
      });
    } else {
      let dateSplit = data.split("/");
      let dateToSave=dateSplit[2]+'-'+dateSplit[1]+'-'+dateSplit[0]
      addVacina({
        vacinaId: vacinaId,
        data: dateToSave,
        petId: petId,
        idade: idade,
      }).then((res) => {
        navigation.goBack();
      });
    }
  };

  const handleExcluir = () => {
    deleteVacina(item.petId, item.id).then((res) => {
      navigation.goBack();
    });
  };

  return (
    <Container>
      <Header title={titulo} goBack={() => navigation.goBack()}>
        <Appbar.Action icon="check" onPress={handleSalvar} />
        {nova === 'Edit' && <Appbar.Action icon="trash-can" onPress={handleExcluir} />}
      </Header>
      <Body>
        <View>
        {vacinasList.map(vacinaItem => (
            <View key={vacinaItem.id} >
              <RadioButton.Group onValueChange={newValue => setVacinaId(newValue)} value={vacinaId} >
                <View >
                  <RadioButton.Item value={vacinaItem.id} label={vacinaItem.descricao + ` (${vacinaItem.tipoPet == 0 ? 'Cachorro' : 'Gato'})`} />
                </View>
              </RadioButton.Group>
            </View>
        ))}
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
              setData(moment(new Date(date)).format('DD/MM/YYYY'));
            }}
          />
        )}
        <TouchableOpacity onPress={() => setShow(true)}>
          <Input
            label="Data"
            value={data}
            editable={false}
          />
        </TouchableOpacity>
        <Input
          label="Idade"
          value={'' + idade}
          keyboardType='decimal-pad'
          onChangeText={(text) => setIdade(text)}
        />
        <Button mode="contained" style={styles.button} onPress={handleSalvar}>
          Salvar
        </Button>

        {nova === 'Edit' && (
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

export default RegistrarVacina;
