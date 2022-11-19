import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import Union from "../../assets/Union.png";
import { styles } from "./styles";

import { Background } from "../../Components/Background/background";
import { Button, TextInput } from "react-native-web";
import api from "../../api/api";

export function CreateAccount({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = () => {
    api
      .post("/users", 
       { name,
        email,
        password,}
      )
      .then(() => navigation.navigate("Login"));
  };

  return (
    <Background>
      <View style={styles.container}>
        <Image source={Union} style={styles.image} resizeMode="stretch" />

        <View style={styles.content}>
          <Text style={styles.title}>Crie sua conta</Text>
          <View>
            <View>
              <Text style={styles.label}>Nome</Text>

              <View style={styles.column}>
                <TextInput
                  placeholder={"Digite seu Email"}
                  style={styles.TextInput}
                  onChangeText={setName}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={[styles.label, { marginBottom: 12, marginTop: 12 }]}>
              Email
            </Text>

            <View style={styles.column}>
              <TextInput
                placeholder={"Digite seu Email"}
                style={styles.TextInput}
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View>
            <Text style={[styles.label, { marginBottom: 12, marginTop: 12 }]}>
              Password
            </Text>

            <View style={styles.column}>
              <TextInput
                placeholder={"Digite sua senha"}
                style={styles.TextInput}
                onChangeText={setPassword}
              />
            </View>
          </View>
          <View style={{ marginTop: 15, marginBottom: 90 }}>
            <Button
              title="Criar sua conta"
              onPress={() => handleCreateAccount()}
            />
          </View>
        </View>
      </View>
    </Background>
  );
}
