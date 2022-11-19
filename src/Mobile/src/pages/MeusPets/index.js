import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import api from "../../api/api";
import { useNavigation } from "@react-navigation/native";
import PetContext from "../../Hooks/pets";
import { Button } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

import ImagemCachorro from "../../assets/Golden.jpg";
import ImagemGato from "../../assets/gato.jpg";

export default function MeusPets() {
  const [pets, setPets] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    api.get("/pets").then((res) => setPets(res.data));
  }, [isFocused]);

  const navigation = useNavigation();

  const { setInformacaoPet } = useContext(PetContext);

  const HandleClickNavigation = (item) => {
    setInformacaoPet(item);
    navigation.navigate("InfoPet");
  };

  const HandleDeletePet = (id) => {
    api.delete(`/pets/${id}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {pets?.length !== 0 ? (
          <>
            {pets?.map((item, key) => (
              <TouchableOpacity
                key={key}
                style={styles.box}
                onPress={() => HandleClickNavigation(item.id)}
              >
                <Image
                  style={styles.img}
                  source={item.tipo == "Cachorro" ? ImagemCachorro : ImagemGato}
                />
                <View>
                  <Text style={styles.nome}>{item.name}</Text>
                  <Text style={styles.raça}>Raça: {item.raca}</Text>
                </View>

              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            <View style={styles.notPet}>
              <Image
                style={styles.imgOps}
                source={require("../../assets/Ops-dog.png")}
              />
              <Text style={styles.textOps}>Opss!</Text>
              <Text style={styles.textNotPet}>
                Você não possui pet cadastrado
              </Text>
            </View>

            <View style={{ justifyContent: "center", paddingHorizontal: 40 }}>
              <Button
                mode="contained"
                theme={{ roundness: 20 }}
                style={{
                  marginTop: 20,
                }}
                onPress={() => navigation.navigate("CadastrarPet")}
                color="#19225B"
              >
                <Text>Cadastrar Pet</Text>
              </Button>
            </View>
          </>
        )}
      </ScrollView>

      {pets?.length !== 0 ? (
        <TouchableOpacity onPress={() => navigation.navigate("CadastrarPet")}>
          <View style={styles.addPet}>
            <Text style={styles.addText}> + </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCDCDC",
  },
  icon: {
    position: "absolute",
    paddingLeft: 300,
    paddingTop: 40,
  },
  box: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
    margin: 10,
  },
  notPet: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  imgOps: {
    width: 170,
    height: 200,
  },
  textOps: {
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  textNotPet: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  nome: {
    paddingTop: 20,
    paddingLeft: 15,
    fontWeight: "bold",
    fontSize: 17,
    color: "#363F5F",
    flexDirection: "column",
  },
  raça: {
    padding: 15,
    fontWeight: "bold",
    color: "#969CB3",
  },
  addPet: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
    bottom: 10,
    marginHorizontal: 290,
  },
  addText: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
