import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert,Text } from 'react-native';
import { TextInput, Button, Headline,RadioButton  } from 'react-native-paper';

import Container from '../components/ContainerAuth';
import Body from '../components/Body';
import Input from '../components/Input';
import Logo from '../components/Logo';

import { useNavigation } from '@react-navigation/native';

import { register } from '../services/auth.services';

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');

  const handleRegister = () => {
    register({
      nome: email,
      password: password,
      perfil:profile
    }).then((res) => {

      if (res) {
        Alert.alert('Atenção', 'Usuário cadastrado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert(
          'Atenção',
          'Usuário não foi cadastrado! Tente novamente mais tarde'
        );
      }
    });
  };

  return (
    <Container>
      <ScrollView>

        <View style={styles.header}>
          <Logo />
        </View>

        <Headline style={styles.title}>Crie sua conta</Headline>

        <Body>
          <View style={styles.input}>
            <Input
              label="Nome"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.input}>
            <Input
              label="Email"
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.input}>
            <Input
              label="Senha"
              value={password}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.containerRadio}>
            <View style={styles.containerRadioItem}>
              <RadioButton
                value={profile}
                status={profile == 1 ? 'checked' : 'unchecked'}
                onPress={() => setProfile(1)}
              />
              <Text>Usuário</Text>
            </View>

            <View style={styles.containerRadioItem}>
            <RadioButton
                value={profile}
                status={profile == 2 ? 'checked' : 'unchecked'}
                onPress={() => setProfile(2)}
              />
              <Text>Instituição</Text>
            </View>
          </View>

          <Button style={styles.button} mode="contained" onPress={handleRegister}>
            Salvar
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.goBack()}>
            Voltar
          </Button>
        </Body>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    textColor: '#ffffff',
    fontWeight: '900',
    backgroundColor: '#2196f3',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 20
  },
  header: {
    alignItems: 'center',
  },
  title: {
    color: '#DDE3F0',
    textAlign: 'center',
    fontSize: 40,
    marginBottom: 5,
    lineHeight: 40,
  },
  label: {
    fontSize: 18,
    color: '#DDE3F0',
  },
  containerRadio: {
    flexDirection: 'row',
    margin: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  containerRadioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color: 'red',
    textColor: 'red',
    backgroundColor: 'white',
  },

});

export default Register;
