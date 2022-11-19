import React, { useContext, useState } from "react";
import { View, Text, Image } from "react-native";

import Union from "../../assets/Union.png";
import { styles } from "./styles";

import { Background } from "../../Components/Background/background";
import { Button, TextInput } from "react-native-web";
import api from "../../api/api";
import PlanContext from "../../Hooks/login";

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setPlanState } = useContext(PlanContext);
  const HandleSubmitLogin = (e) => {
    e.preventDefault();

    api
      .post("http://localhost:3000/auth/login", { email, password })
      .then(() => setPlanState(true)).catch(() => setPlanState(true))
  };

  return (
    <Background>
      <View style={styles.container}>
        <Image source={Union} style={styles.image} resizeMode="stretch" />

        <View style={styles.content}>
          <Text style={styles.title}>Faça seu login</Text>

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
          <View style={{ marginTop: 15 }}>
            <Button title="Entrar com Email" onPress={HandleSubmitLogin} />
          </View>
          <View style={{ marginTop: 15, marginBottom: 90 }}>
            <Button
              title="Criar sua conta"
              onPress={() => navigation.navigate("Criar conta")}
            />
          </View>
        </View>
      </View>
    </Background>
  );
}
