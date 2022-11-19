import {Image, Text, View} from "react-native";
import { styles } from './styles';
import {Button} from "react-native-web";
import HomePng from '../../assets/HomePngG.png';
import {Background} from "../../Components/Background/background";

const Presentation = ({navigation}) => {

    return (
        <Background>
        <View style={styles.container}>
            <Image
                source={HomePng}
                style={styles.image}
                resizeMode="stretch"
            />

            <View style={styles.content}>
                <Text style={styles.title}>
                    Pet Pass
                </Text>

                <Text style={styles.subtitle}>
                    Crie o cartão de vacina {'\n'}
                    do seu pet online{'\n'}
                    e acesse onde quiser
                </Text>

                <Button
                    title="Entrar com Email"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </View>
        </Background>
    )
}
export default Presentation