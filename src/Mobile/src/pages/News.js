import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet,Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/ContainerMain';
import Body from '../components/Body';

import moment from 'moment';

import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { getNews } from '../services/news.services';
import { useIsFocused } from '@react-navigation/native';

const Meusnews = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { name } = useUser();
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews().then((dados) => {
      setNews(dados);
    });
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
          <Card.Title
            title={item.titulo}
            subtitle={moment(item).format('DD/MM/YYYY')}
          />
          <Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
             <Text numberOfLines={5} ellipsizeMode='tail' onPress={() => navigation.navigate('ReadNews',{item})}>
              {item.noticia}
            </Text>
          </Card.Content>
        </Card>
  );
  return (
    <Container>
      <Header title={'Notícias'} />
      <Body>
        <FlatList
          data={news}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 6,
    right: 0,
    bottom: 0,
  },
});

export default Meusnews;
