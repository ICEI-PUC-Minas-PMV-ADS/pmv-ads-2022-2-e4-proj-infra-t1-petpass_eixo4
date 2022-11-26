import React, { useState, useEffect } from 'react';
import { StyleSheet,Text } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/ContainerMain';
import Body from '../components/Body';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const ReadNews = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;

  const [titulo, setTitulo] = useState(null);
  const [noticia, setNoticia] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
      setData(item.data);
      setNoticia(item.noticia);
      setTitulo(item.titulo);
  }, [item]);

  return (
    <Container>
      <Header title={item.titulo} goBack={() => navigation.goBack()}></Header>
      <Body>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.date}>{moment(item).format('DD/MM/YYYY')}</Text>
      <Text style={styles.news}>{item.noticia}</Text>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: 18,
    paddingBottom:5,
    fontWeight:'bold',
  },
  news:{
    fontSize: 20,
  },
  titulo:{
    fontSize:30,
    fontWeight:'bold',
    paddingBottom:5
  }
});

export default ReadNews;
