import { useNavigation } from '@react-navigation/native';
import {
    HStack,
    VStack,
    Box,
    Center,
    Heading,
    Avatar,
    Pressable,
    Text,
    Image
} from 'native-base';
import { ImagePet } from '../views/PetDetails';
export function MedicalRecord(props){
    
    const navigation = useNavigation()

    return(
        <Pressable   marginBottom="5" bg="#FE5000" borderRadius="3xl" key={props.pet.id} onPress={() => navigation.navigate('CardMed', {'pet': props.pet})}>
           
            <HStack> 
                <HStack h="90%" alignItems="center" justifyContent="space-between">
                    <Box  h="100%"  padding={5}>
                     <ImagePet specie={props.pet.specie}></ImagePet>
                    </Box>
                    <Box>
                        <Heading color="#FFFFFF" fontFamily="Mont" size='md'>{props.pet.name}</Heading>
                        <Text fontFamily="Mont" color="#FFFFFF">{props.pet.specie}. {props.pet.sex}</Text>
                        <Text fontFamily="Mont" color="rgba(255, 255, 255, 0.71)">{props.pet.breed}. {props.pet.ageYears} Anos, {props.pet.ageMonths}meses</Text>
                    </Box>
                </HStack>                                        
            </HStack>
        </Pressable>
    )
}