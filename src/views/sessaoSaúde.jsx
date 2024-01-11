import  React,{useState ,  useEffect} from "react";
import {Box, Flex, Icon, HStack, VStack, Heading, Text, Avatar, Center ,Pressable} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native"
import { auth } from '../../services/firebase'
import { getPetsByEmail } from "../../services/pets";
import { MedicalRecord } from "../components/MedicalRecord";
import Navbar from "../components/navbar";
export default function SessaoSaude (){
    
    const [userPets, setUserPets] = useState(null);

    useEffect(() => {
        (async function getPetList(){
            try{
                let petList = await getPetsByEmail(auth.currentUser.email);
                setUserPets(petList)
            }catch(error){
                console.log(error)
            }
        })()
      

    }, []);

    const navigation = useNavigation();
    const route = useRoute();
    return(
        <Box flex={1} backgroundColor="#FE5000" h="10%">
            <HStack h="10%" px={2} w="100%" color="#FFF" justifyContent="space-between" alignItems="center" textAlign="center">
            <Pressable onPress={() => navigation.goBack()}>
            <Icon
                as={Feather}
                name="chevron-left"
                size={30}
                color="#FFF">
            </Icon>
            </Pressable>
            <Heading alignSelf="center" color="white">Saúde</Heading>
            <Box w={30}></Box>
            </HStack>
            <Box borderTopRadius="md" backgroundColor= "#FFF" h="100%"  w="100%" py={3} px={5}  bg="white">
                <Box>
                    <HStack  marginBottom="10"alignItems="center" justifyContent="space-between" marginTop={5}>
                        <Heading fontFamily="Mont" color="#003DA5" size="md">Ficha médica dos seus pets</Heading>
                    </HStack>
                </Box>
                    <VStack>
                        <Box>

                            {userPets?.map(pet => (
                                <MedicalRecord key={pet.id} pet={pet}></MedicalRecord>
                            ))}
                            
                        </Box>
                        <Pressable  justifyContent="center" alignItems="center" h="50" borderRadius="full" borderWidth={1}  borderColor="#E54300">
                        <Heading size="sm" color="#E54300" fontFamily="Mont">
                            Adicionar novo Pet
                            </Heading>
                        </Pressable>    
                    </VStack>
                    
            </Box>
        <Navbar/>
        </Box>
    )


}