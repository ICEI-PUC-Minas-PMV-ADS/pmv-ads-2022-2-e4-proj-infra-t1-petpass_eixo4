import React, { useState } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';

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

  const handleRegister = () => {
    register({
      name: name,
      email: email,
      password: password,
    }).then((res) => {
      console.log(res);

      if (res) {
        console.log(res);
        Alert.alert('Atenção', 'Usuário cadastrado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        console.log(res);
        Alert.alert(
          'Atenção',
          'Usuário não foi cadastrado! Tente novamente mais tarde'
        );
      }
    });
  };

  return (
    <Container>
      <View style={styles.header}>
        <Logo />
      </View>

      <Headline style={styles.title}>Crie sua conta</Headline>

      <Body>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={[styles.label, { marginBottom: 12, marginTop: 12 }]}>
            Nome
          </Text>
          <Input
            label="Nome"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Text style={[styles.label, { marginBottom: 12, marginTop: 12 }]}>
            Email
          </Text>
          <Input
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={[styles.label, { marginBottom: 12, marginTop: 12 }]}>
            Senha
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Input
            label="Senha"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
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
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 20,
    marginBottom: 8,
    textColor: '#ffffff',
    fontWeight: '900',
    backgroundColor: '#2196f3',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    color: '#DDE3F0',
    textAlign: 'center',
    fontSize: 40,
    marginBottom: 30,
    lineHeight: 40,
  },
  label: {
    fontSize: 18,
    color: '#DDE3F0',
  },
});

export default Register;
