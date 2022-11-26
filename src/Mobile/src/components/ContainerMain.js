import React from 'react';
import { StyleSheet, View } from 'react-native';

const ContainerMain = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCD0F0',
  },
});

export default ContainerMain;
