import {
    Center,
    Avatar,
    Text,
    Pressable
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ImagePet } from '../../views/PetDetails/index';
export function CardAnimal(props){
    const navigation = useNavigation();
    return(
        <Pressable onPress={() =>  navigation.navigate('PetDetails', {petId: props.pet.id}, {petId: props.pet.id})} padding={5} m={2} borderRadius={12} borderWidth="1" borderColor="#E54300" w='50%'>
            <Center h="100%">
               <ImagePet specie={props.pet.specie}></ImagePet>
                <Text mt={3} color="#FE5000" fontFamily="Mont" textSize="lg" bold>{props.pet.name}</Text>
                <Text mb={3} fontFamily="Mont" textSize="lg">{props.pet.specie}</Text>
            </Center>
        </Pressable>
    )
}