import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";
import { TextInput, Button, List } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import api from "../../api/api";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const CadastrarVacina = () => {
  const [nome, setNome] = useState("");
  const [vacina, setVacina] = useState("");
  const [idade, setIdade] = useState("");
  const [dataAplicacao, setDataAplicacao] = useState(new Date());
  const [dose, setDose] = useState("");

  const [petId, setPetId] = useState();

  const [petExpanded, setPetExpanded] = useState(false);
  const [vacinaExpanded, setVacinaExpanded] = useState(false);

  const [pets, setPets] = useState();
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const [showDataAplicacaoPicker, setShowDataAplicacao] = useState(false);

  const dataCreateVacina = {
    nome,
    vacina,
    idade,
    dataAplicacao,
    dose,
    petId
  };
  const handleCreateVacina = () => {
    setTimeout(() => {
      api
        .post("/vacinas", dataCreateVacina)
        .then(() => navigation.navigate("Meus Pets"))
        .catch((err) => console.error(err));
    }, 1000);
  };

  useEffect(() => {
    api.get("/pets").then((res) => setPets(res.data));
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <ScrollView>
          <List.Section title="Pet">
            <List.Accordion
              title={nome}
              expanded={petExpanded}
              onPress={() => setPetExpanded(!petExpanded)}
              left={(props) => <List.Icon {...props} icon="paw" />}
            >
              {pets?.map((item, key) => (
                <List.Item title={item.name} key={key} onPress={() => {
                  setPetId(item.id)
                  setNome(item.name)
              }} />
              ))}
            </List.Accordion>
          </List.Section>

          <List.Section title="Vacina">
            <List.Accordion
              title={vacina}
              expanded={vacinaExpanded}
              onPress={() => setVacinaExpanded(!vacinaExpanded)}
              left={(props) => <List.Icon {...props} icon={({ size, color }) => (
                <FontAwesome5 name="syringe" size={25} />
              )} />}
            >
              <List.Item title="V8 ou V10" onPress={(text) => setVacina("V8 ou V10")} />
              <List.Item title="Gripe Canina" onPress={(text) => setVacina("Gripe Canina")} />
              <List.Item title="Giardiase" onPress={(text) => setVacina("Giardiase")} />
              <List.Item title="Anti-rábica" onPress={(text) => setVacina("Anti-rábica")} />  
            </List.Accordion>
          </List.Section>

          <TextInput
            label="Idade de aplicação(em semanas)"
            value={idade}
            onChangeText={(text) => setIdade(text)}
          />

          {showDataAplicacaoPicker ? (
            <DateTimePicker
              testID="dateTimeRegistroPicker"
              value={dataAplicacao}
              mode={"date"}
              is24Hour={true}
              display="default"
              onTouchCancel={() => setShowDataAplicacao(false)}
              onChange={(event, date) => {
                setShowDataAplicacao(false);
                setDataAplicacao(date);
              }}
            />
          ) : null}

          <TouchableOpacity onPress={() => setShowDataAplicacao(true)}>
            <TextInput
              label="Data de Aplicação"
              value={moment(dataAplicacao).format("DD/MM/YYYY")}
              left={<TextInput.Icon name="calendar" />}
              onChangeText={(text) => setDataAplicacao(text)}
              editable={false}
            />
          </TouchableOpacity>

          <TextInput
            label="Dose aplicada"
            value={dose}
            onChangeText={(text) => setDose(text)}
          />

          <View style={{ justifyContent: "center", paddingHorizontal: 40 }}>
            <Button
              mode="contained"
              style={{
                marginTop: 30,
              }}
              theme={{ roundness: 20 }}
              color="#19225B"
              onPress={() => handleCreateVacina()}
            >
              <Text>Cadastrar</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCDCDC",
  },
  box: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default CadastrarVacina;