import React, { useState } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import Container from '../components/ContainerAuth';
import Body from '../components/Body';
import Logo from '../components/Logo';

import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <View style={styles.header}>
        <Logo />
      </View>

      <Headline style={styles.title}>Pet Pass</Headline>

      <Body>
        <Text style={styles.subtitle}>
          Crie o cartão de vacina {'\n'}
          do seu pet online{'\n'}e acesse onde quiser
        </Text>

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('Login')}>
          Entrar com Email
        </Button>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    margin:40,
    marginBottom: 8,
    textColor: 'white',
    fontWeight:'900',
    backgroundColor:'#2196f3'
  },
  header: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 12,
  },
  title: {
    color: '#DDE3F0',
    textAlign: 'center',
    fontSize: 40,
    marginTop: 10,
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    color: '#DDE3F0',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 25,
  },
});

export default Login;
