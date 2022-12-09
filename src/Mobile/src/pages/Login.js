import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Headline } from 'react-native-paper';
import Container from '../components/ContainerAuth';
import Body from '../components/Body';
import Input from '../components/Input';
import Logo from '../components/Logo';

import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';

import { login } from '../services/auth.services';

const Login = () => {
  const navigation = useNavigation();
  const { signed, setSigned, userId, setUserId } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({
      email: email,
      password: password,
    }).then((res) => {

      if (res) {
        setSigned(true);
        setUserId(res.id);
        AsyncStorage.setItem('@TOKEN_KEY', res.jwtToken).then();
      } else {
        Alert.alert('Atenção', 'Usuário/senha inválidos');
      }
    });
  };

  return (
    <Container>
      <View style={styles.header}>
        <Logo />
      </View>

      <Headline style={styles.title}>Faça seu login</Headline>

      <Body>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={[styles.label, { marginBottom: 12, marginTop: 12 }]}>
            Email
          </Text>
          <Input
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={[styles.label, { marginBottom: 12, marginTop: 12 }]}>
            Senha
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Input
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Button style={styles.button} mode="contained" onPress={handleLogin}>
          Login
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('Register')}>
          CRIAR SUA CONTA
        </Button>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
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
    marginBottom: 0,
    lineHeight: 40,
  },
  label: {
    fontSize: 18,
    color: '#DDE3F0',
  },
});

export default Login;
