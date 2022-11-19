import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Text, List } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import api from '../../api/api';
import { useNavigation } from '@react-navigation/native';


const CadastrarPet = () => {
  
  const [name, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [peso, setPeso] = useState('');
  const [idade, setIdade] = useState('');

  
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [dataRegistro, setDataRegistro] = useState(new Date());
  
  const [tipoExpanded, setTipoExpanded] = useState(false); 
  const [sexoExpanded, setSexoExpanded] = useState(false);
  
  const navigation = useNavigation();
  
  const [showDataNascimentoPicker, setShowDataNascimentoPicker] = useState(false);
  const [showDataRegistroPicker, setShowDataRegistroPicker] = useState(false);

  const dataCreatePet = { name,tipo,sexo,raca,peso,idade,dataNascimento,dataRegistro } 
  const handleCreatePet = () => {

      api.post('/pets' , dataCreatePet)
      .then(() =>     setTimeout(() => { navigation.navigate('Meus Pets')   }, 1000))
      .catch((err) => console.error(err));
  }

  return (
    <View>
       <ScrollView>
        <TextInput
          label="Nome"
          value={name}
          onChangeText={(text) => setNome(text)}
        />
        <List.Section title="Tipo">
          <List.Accordion 
            title={tipo}
            expanded={tipoExpanded}
            onPress={() => setTipoExpanded(!tipoExpanded)}
            left={props => <List.Icon {...props} icon="paw" />}>
            <List.Item title="Cachorro" onPress={(text) => setTipo('Cachorro')}/>
            <List.Item title="Gato" onPress={(text) => setTipo('Gato')} />
          </List.Accordion>
        </List.Section>

      <List.Section title="Sexo">
        <List.Accordion
            title={sexo}
            expanded={sexoExpanded}
            onPress={() => setSexoExpanded(!sexoExpanded)}
            left={props => <List.Icon {...props} icon="gender-male-female" />}>
          <List.Item title="Macho" onPress={(text) => setSexo('Macho')} />
          <List.Item title="Femea" onPress={(text) => setSexo('Femea')} />
        </List.Accordion>
      </List.Section>

        <TextInput
          label="Raça"
          value={raca}
          onChangeText={(text) => setRaca(text)}
        />
        <TextInput
          label="Peso (kg)"
          value={peso}
          onChangeText={(text) => setPeso(text)}
        />
        <TextInput
          label="Idade"
          value={idade}
          onChangeText={(text) => setIdade(text)}
        />
        {showDataNascimentoPicker ? (
          <DateTimePicker
            testID="dateTimeNascimentoPicker"
            value={dataNascimento}
            mode={'date'}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShowDataNascimentoPicker(false)}
            onChange={(event, date) => {
              setShowDataNascimentoPicker(false);
              setDataNascimento(date);
            }}
          />
        ) : null}
        {showDataRegistroPicker ? ( 
          <DateTimePicker
            testID="dateTimeRegistroPicker"
            value={dataRegistro}
            mode={'date'}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShowDataRegistroPicker(false)}
            onChange={(event, date) => {
              setShowDataRegistroPicker(false);
              setDataRegistro(date);
            }}
          />
        ) : null}
        <TouchableOpacity onPress={() => setShowDataNascimentoPicker(true)}>
          <TextInput
            label="Data de Nascimento"
            value={moment(dataNascimento).format('DD/MM/YYYY')}
            left={<TextInput.Icon name="calendar" />}
            onChangeText={(text) => setDataNascimento(text)}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDataRegistroPicker(true)}>
          <TextInput
            label="Data de Registro"
            value={moment(dataRegistro).format('DD/MM/YYYY')}
            left={<TextInput.Icon name="calendar" />}
            onChangeText={(text) => setDataRegistro(text)}
            editable={false}
          />
        </TouchableOpacity>
        <Button mode="contained"  onPress={() => handleCreatePet()}>
          <Text>Cadastrar</Text>
        </Button>
         </ScrollView>
    </View>
  );
};


export default CadastrarPet;
