import { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import api from "../../api/api";
import { useIsFocused } from "@react-navigation/native";
import PetContext from "../../Hooks/pets";
import { Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";




import ImagemCachorro from "../../assets/Golden.jpg";
import ImagemGato from "../../assets/gato.jpg";

export default function MeusPetsInfo(){
    const { informacaoPet } = useContext(PetContext);
    const navigation = useNavigation();


    const isFocused = useIsFocused();

    const [pet, setPet] = useState({});
    const [vacina, setVacina] = useState({});
    
    useEffect(() => {
      api.get(`/pets/${informacaoPet}/?_embed=vacinas`).then((res) => setPet(res.data));
    }, [isFocused]);
    
    const formatarData = (data) => {
      return new Date(data).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    };

    const HandleDeletePet = (id) => {
      api.delete(`/pets/${id}`);
      navigation.navigate("Meus Pets");
    };

   return (
       <>
       
        <TouchableOpacity style={styles.card}>
            <Image style={styles.img} source={pet.tipo == "Cachorro" ? ImagemCachorro: ImagemGato}/>

                <View style={styles.infoContainer}>
                    <View style={styles.petInfo}>
                        <Text style={styles.name}>Nome: {pet.name}</Text>
                        <Text style={styles.raca}>Raça: {pet.raca}</Text>
                    </View>
                        <Text style={styles.restInfo}>Tipo: {pet.tipo}</Text>
                        <Text style={styles.restInfo}>Peso: {pet.peso}Kg</Text>
                        <Text style={styles.restInfo}>Idade: {pet.tipo}</Text>
                        <Text style={styles.restInfo}>Data Nasc: {formatarData(pet.dataNascimento)}</Text>
                        <Text style={styles.restInfo}>Data de Cadastro: {formatarData(pet.dataRegistro)}</Text>
                </View>
        </TouchableOpacity>

                <Button
                  mode="contained"
                  theme={{ roundness: 100 }}
                  style={{
                     marginBottom: 20,
                  }}
                  onPress={() => HandleDeletePet(pet.id)}
                  color="#19225B"
                >
                <FontAwesome5 name="trash" size={15} />
                  <Text>Deletar Pet</Text>
                </Button>
        
        <ScrollView>    
            {pet.vacinas?.length !== 0 ? (
              <>
                {pet.vacinas?.map((item, key) => (
                <View style={styles.cardVac} key={key}>
                      <Image
                        style={styles.imgVac}
                        source={require("../../assets/ImagemVacina.png")}
                      />
                    <View style={styles.infoContainer} key={key}>
                      <View style={styles.vacInfo}>
                        <Text style={styles.restInfo}>Vacina: {item.vacina}</Text>
                        <Text style={styles.restInfo}>Dose: {item.dose}</Text>
                        <Text style={styles.restInfo}>
                          Data Aplicação: {formatarData(item.dataAplicacao)}
                        </Text>
                      </View>
                    </View>
                </View>
                ))}
              </>
            ) : (
              <>
                <Text style={styles.textNotVac}>Você não tem nenhuma vacina</Text>

                  <Button
                    mode="contained"
                    theme={{ roundness: 20 }}
                    onPress={() => navigation.navigate("CadastrarVacina")}
                    color="#19225B"
                  >
                    <Text>Cadastrar Vacina</Text>
                  </Button>
              </>
            )}
          </ScrollView>  
       </>
   );
}

const styles = StyleSheet.create({
    card: {
        flexDirection:"row",
        marginVertical:20,
        marginHorizontal:10,
        backgroundColor: "#fff",
        borderRadius:15, 
        height:250
    },
    cardVac:{
      flexDirection:"row",
      marginVertical:5,
      marginHorizontal:10,
      backgroundColor: "#fff",
      borderRadius:15, 
      height:125
    },
    img: {
        width: 100,
        height: 150,
        borderRadius: 50,
        margin: 10,
      },
      imgVac: {
        width: 100,
        height: 100,
        borderRadius: 30,
        margin: 10,
      },
      infoContainer:{
        paddingLeft:5
      },
      petInfo:{
        flexDirection:"column",
        justifyContent:"space-between",
        marginBottom:5,
        paddingVertical:20
      },
      vacInfo:{
        flexDirection:"column",
        marginBottom:5,
        marginVertical:20
      },
      name:{
        fontSize:20,
        fontFamily: "Roboto",
        fontWeight: "bold",
      },
      raca:{
        fontSize:18,
        fontWeight: "700",
        fontFamily: "Roboto",
      },
      restInfo:{
        fontSize:17,
        fontWeight: "400",
        color: "#787878"
      },

      infoVac: {
        paddingHorizontal:20,
      },
      textNotVac: {
        fontWeight: "bold",
        fontSize:20,
        marginTop:100,
        marginLeft:40
      }
     
})
