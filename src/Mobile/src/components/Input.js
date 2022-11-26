import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const Header = (props) => {
  return (
    <TextInput style={styles.input} {...props} />
  );
};

const styles = StyleSheet.create({
  input: {
        width: "100%",
        height: 48,
        backgroundColor: '#495BCC',
        color: '#ffffff',
        borderRadius: 8,
        fontSize: 20,
        marginRight: 4,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#243189'
  },
});

export default Header;
