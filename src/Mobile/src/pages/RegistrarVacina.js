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

import { deleteVacina, addVacina, updateVacina } from '../services/pets.services';
import { getVacinas } from '../services/vacinas.services';

const RegistrarVacina = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params ? route.params : {};
  //console.log('Item (route): ', item);
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

  useEffect(() => {
    console.log('Item: ', item);
    if (item.dataRegistro) { //pet
      newVacina(item);
    } else { //RegistroVacina
      editVacina(item);
    }
    getVacinasList(tipoPet);
  }, [tipoPet]);

  const newVacina = (item) =>{
    console.log('Função NewVacina');
    console.log('Item (newVacina):',item);
    setTipoPet(item.tipo);
    setNova('Add');
    console.log('nova: ', nova);
    setTitulo(`Vacinar ${item.nomePet}`);
    setPetId(item.id);
    setData(moment(new Date()).format('DD/MM/YYYY'));
  };

  const editVacina = (item) =>{
    console.log('Função editVacina');
    console.log('Item (editVacina): ',item);
    console.log('tipoPet (do item): ', item.vacina.tipoPet);
    setTipoPet(item.vacina.tipoPet);
    console.log('TipoPet em editVacina: ', tipoPet);
    setNova('Edit');
    console.log('nova: ', nova);
    setTitulo('Editar vacina');
    setDescricao(item.descricao);
    setData(moment(new Date(item.data)).format("DD/MM/YYYY"));
    setIdade(item.idade);
    setVacinaId(item.vacinaId);
    //console.log('VacinaId: ', vacinaId);

  };


  const getVacinasList = (tipoPet) => {
    getVacinas().then((dados) => {
      console.log('Dados antes do Filtro: ', dados);
      console.log('Filtrar por tipo pet: ', tipoPet);
      if (tipoPet != null || tipoPet == '' || tipoPet == []) {
        let dadosFiltrados = dados.filter(x => x.tipoPet == tipoPet);
        //console.log('Dados filtrados: ', dadosFiltrados)
        setVacinasList(dadosFiltrados);
      } else {
        console.log('Dados NÃO filtrados')
        setVacinasList(dados);
      }
      console.log('vacinaslist: ', vacinasList);
    }
    );
  }

  const handleSalvar = () => {
    //console.log('nova: ', nova);
    if (nova === 'edit') {
      console.log('Handlesalvar updateVacina');
      updateVacina({
        vacinaId: vacinaId,
        data: moment(new Date(data)).format('YYYY-MM-DD'),
        petId: petId,
        idade: idade,
        id: item.id,
      }).then((res) => {
        navigation.goBack();
      });
    } else {
      addVacina({
        vacinaId: vacinaId,
        data: moment(new Date(data)).format('YYYY-MM-DD'),
        petId: petId,
        idade: idade,
      }).then((res) => {
        navigation.goBack();
      });
    }
  };

  const handleExcluir = () => {
    console.log('handle excluir');
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
              setData(moment(date).format('DD/MM/YYYY'));
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
