import React from 'react';
import { StyleSheet, View } from 'react-native';

const ContainerAuth = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1647',
  },
});

export default ContainerAuth;
