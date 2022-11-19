import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import api from "../../api/api";
import { TextInput } from "react-native";

import { useNavigation, useIsFocused } from "@react-navigation/native";


import { Button } from "react-native-paper";


export default function App() {
  const [user, setUser] = useState([]);
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const isFocused = useIsFocused();
  const navigation = useNavigation();



  useEffect(() => {
    api.get("/users").then((res) => setUser(res.data));
  }, [isFocused]);

  const handleEditProfile = (item) => {
    api.put(`/users/${item}`, { name, email });
    navigation.navigate("Meus Pets");
    setEdit(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 10, backgroundColor:'#dcdcdc', marginBottom:20, marginTop:20 }}>
        {edit ? (
          <TextInput
            defaultValue={user[0]?.name}
            style={{ 
              margin: 10, 
              fontSize: 20, 
              backgroundColor:'#fff',
              borderRadius:10,
              padding:10,
              color:'#000'
            }}
            onChangeText={setName}
          />
        ) : (
          <Text 
          style={{
             margin: 10, 
             fontSize: 20, 
             backgroundColor:'#fff',
             borderRadius:10,
             padding:10,
             color:'#000'
          }}>
            Nome: {user[0]?.name}
          </Text>
        )}

        {edit ? (
          <TextInput
            defaultValue={user[0]?.email}
            style={{
              margin: 10, 
              fontSize: 20, 
              backgroundColor:'#fff',
              borderRadius:10,
              padding:10,
              color:'#000'
            }}
            onChangeText={setEmail}
          />
        ) : (
          <Text style={{
             margin: 10,
             fontSize: 20, 
             backgroundColor:'#fff',
             borderRadius:10,
             padding:10,
             color:'#000'
          }}>
            Email: {user[0]?.email}
          </Text>
        )}

        <StatusBar style="auto" />
      </View>

      {edit ? (
        <Button
              mode="contained"
              style={{
                marginTop: 30,
              }}
              theme={{ roundness: 20 }}
              color="#19225B"
              onPress={() => handleEditProfile(user[0]?.id)}
            >
              <Text>Salvar dados</Text>
            </Button>
      ) : (
        <Button
              mode="contained"
              style={{
                marginTop: 30,
              }}
              theme={{ roundness: 20 }}
              color="#19225B"
              onPress={() => setEdit(true)}
            >
              <Text>Alterar Dados</Text>
            </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCDCDC",
  },
});
