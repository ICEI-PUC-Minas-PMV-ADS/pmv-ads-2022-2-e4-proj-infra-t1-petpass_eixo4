import React from 'react';
import { StyleSheet, Image } from 'react-native';

const Logo = () => {
  return <Image style={styles.image} source={require('../assets/HomePng.png')} />
};

const styles = StyleSheet.create({
  image: {
        width: '100%',
        height: 360,
  },
});

export default Logo;